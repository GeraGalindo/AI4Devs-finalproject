import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a native button, type="button" and primary by default', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('cc-button', 'cc-button--primary');
    expect(button).not.toHaveAttribute('aria-busy');
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('applies the secondary variant, extra classes, native attributes and the ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} variant="secondary" className="extra" name="action" data-testid="b" type="submit">
        Retry
      </Button>,
    );
    const button = screen.getByTestId('b');
    expect(button).toHaveClass('cc-button', 'cc-button--secondary', 'extra');
    expect(button).toHaveAttribute('name', 'action');
    expect(button).toHaveAttribute('type', 'submit');
    expect(ref.current).toBe(button);
  });

  it('runs onClick on click, Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    const button = screen.getByRole('button', { name: 'Go' });

    await user.click(button);
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('is natively disabled with disabled: no click and out of the tab order', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Go' });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    await user.tab();
    expect(button).not.toHaveFocus();
  });

  describe('loading', () => {
    it('stays focusable, is announced as busy and shows a decorative indicator without text', async () => {
      const user = userEvent.setup();
      render(<Button loading>Create account</Button>);
      const button = screen.getByRole('button', { name: 'Create account' });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeEnabled();
      await user.tab();
      expect(button).toHaveFocus();

      const spinner = button.querySelector('.cc-button__spinner');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
      expect(spinner).toHaveTextContent('');
    });

    it('keeps the focus when loading starts', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Button>Send</Button>);
      await user.tab();
      rerender(<Button loading>Send</Button>);
      expect(screen.getByRole('button', { name: 'Send' })).toHaveFocus();
    });

    it('does not run onClick on click, double click, Enter or Space', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Go
        </Button>,
      );
      const button = screen.getByRole('button', { name: 'Go' });
      await user.click(button);
      await user.dblClick(button);
      button.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not submit its form: click, double click, Enter and Space on the button, or Enter in a field', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
      render(
        <form onSubmit={(event) => onSubmit(event.nativeEvent as SubmitEvent)}>
          <input aria-label="Email" />
          <Button type="submit" loading>
            Create account
          </Button>
        </form>,
      );
      const button = screen.getByRole('button', { name: 'Create account' });
      await user.click(button);
      await user.dblClick(button);
      button.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      await user.type(screen.getByRole('textbox', { name: 'Email' }), 'ana@example.com{Enter}');
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits normally once loading ends (control case)', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
      const form = (loading: boolean) => (
        <form onSubmit={(event) => onSubmit(event.nativeEvent as SubmitEvent)}>
          <input aria-label="Email" />
          <Button type="submit" loading={loading}>
            Create account
          </Button>
        </form>
      );
      const { rerender } = render(form(true));
      await user.click(screen.getByRole('button', { name: 'Create account' }));
      rerender(form(false));
      await user.click(screen.getByRole('button', { name: 'Create account' }));
      await user.type(screen.getByRole('textbox', { name: 'Email' }), '{Enter}');
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });
});
