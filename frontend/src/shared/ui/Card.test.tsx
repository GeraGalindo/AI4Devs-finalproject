import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Card } from './Card';

describe('Card', () => {
  it('is a neutral container without an implicit role', () => {
    render(<Card data-testid="c">Content</Card>);
    const card = screen.getByTestId('c');
    expect(card.tagName).toBe('DIV');
    expect(card).not.toHaveAttribute('role');
    expect(card).toHaveClass('cc-card');
    expect(card).not.toHaveClass('cc-card--raised');
    expect(card).toHaveTextContent('Content');
  });

  it('has a raised variant', () => {
    render(
      <Card raised data-testid="c">
        Content
      </Card>,
    );
    expect(screen.getByTestId('c')).toHaveClass('cc-card', 'cc-card--raised');
  });

  it('passes className, native attributes and the ref; semantics come from the consumer', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card ref={ref} className="extra" role="region" aria-label="Account" id="account">
        Content
      </Card>,
    );
    const region = screen.getByRole('region', { name: 'Account' });
    expect(region).toHaveClass('cc-card', 'extra');
    expect(region).toHaveAttribute('id', 'account');
    expect(ref.current).toBe(region);
  });
});
