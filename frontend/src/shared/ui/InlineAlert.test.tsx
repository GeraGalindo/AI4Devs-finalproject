import { render, screen } from '@testing-library/react';
import { InlineAlert } from './InlineAlert';

describe('InlineAlert', () => {
  it('announces errors immediately with role="alert"', () => {
    render(<InlineAlert tone="error">Too many attempts.</InlineAlert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Too many attempts.');
    expect(alert).toHaveClass('cc-alert', 'cc-alert--error');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('announces information politely with role="status"', () => {
    render(<InlineAlert tone="info">Saved.</InlineAlert>);
    expect(screen.getByRole('status')).toHaveTextContent('Saved.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the title and the message given by the consumer', () => {
    render(
      <InlineAlert tone="error" title="Could not create the account">
        This email already has an account.
      </InlineAlert>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Could not create the accountThis email already has an account.');
  });

  it('has a decorative icon in addition to the text, so color is not the only cue', () => {
    render(<InlineAlert tone="error">Error.</InlineAlert>);
    const icon = screen.getByRole('alert').querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');
    expect(icon?.textContent).toBe('');
  });

  it('passes native attributes and classes', () => {
    render(
      <InlineAlert tone="info" id="notice" className="extra" data-testid="a">
        Info.
      </InlineAlert>,
    );
    const alert = screen.getByTestId('a');
    expect(alert).toHaveAttribute('id', 'notice');
    expect(alert).toHaveClass('cc-alert', 'cc-alert--info', 'extra');
  });
});
