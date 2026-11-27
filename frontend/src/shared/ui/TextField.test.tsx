import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label with the input through htmlFor and a generated id', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
    expect(input.id).not.toBe('');
    expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
  });

  it('generates different ids for different fields', () => {
    render(
      <>
        <TextField label="Email" />
        <TextField label="Password" type="password" />
      </>,
    );
    expect(screen.getByLabelText('Email').id).not.toBe(screen.getByLabelText('Password').id);
  });

  it('uses the id given by the consumer', () => {
    render(<TextField label="Email" id="signup-email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'signup-email');
  });

  it('is valid and not described without hint or error', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).toHaveAccessibleDescription('');
  });

  it('describes the input with the hint', () => {
    render(<TextField label="Password" type="password" hint="At least 12 characters." id="pw" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-describedby', 'pw-hint');
    expect(input).toHaveAccessibleDescription('At least 12 characters.');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('marks the error with aria-invalid and describes the input with hint and error, without role="alert"', () => {
    render(<TextField label="Password" type="password" hint="At least 12 characters." error="Too short." id="pw" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'pw-hint pw-error');
    expect(input).toHaveAccessibleDescription('At least 12 characters. Too short.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Too short.').closest('p')?.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps the consumer aria-describedby ids and adds its own without duplicates', () => {
    render(
      <>
        <p id="rules">Shared rules.</p>
        <TextField label="Email" id="em" hint="We never share it." error="Invalid." aria-describedby="rules em-hint  rules" />
      </>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-describedby', 'rules em-hint em-error');
    expect(input).toHaveAccessibleDescription('Shared rules. We never share it. Invalid.');
  });

  it('keeps only the consumer ids when there is no hint or error', () => {
    render(
      <>
        <p id="rules">Shared rules.</p>
        <TextField label="Email" aria-describedby="rules" />
      </>,
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'rules');
  });

  it('passes ref, name, type, autoComplete and required to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} label="Email" name="email" type="email" autoComplete="email" required />);
    const input = screen.getByLabelText('Email');
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toBeRequired();
  });

  it('works as a controlled field', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('');
      return (
        <>
          <TextField label="Email" value={value} onChange={(e) => setValue(e.target.value.toLowerCase())} />
          <output>{value}</output>
        </>
      );
    }
    render(<Controlled />);
    await user.type(screen.getByLabelText('Email'), 'ANA@Example.com');
    expect(screen.getByLabelText('Email')).toHaveValue('ana@example.com');
    expect(screen.getByRole('status')).toHaveTextContent('ana@example.com');
  });

  it('works as an uncontrolled field inside a form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((data: FormData) => data);
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(new FormData(event.currentTarget));
        }}
      >
        <TextField label="Email" name="email" defaultValue="old@example.com" />
        <button type="submit">Send</button>
      </form>,
    );
    const input = screen.getByLabelText('Email');
    await user.clear(input);
    await user.type(input, 'new@example.com{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.results[0]?.value.get('email')).toBe('new@example.com');
  });

  it('is reachable with the keyboard and can be disabled', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TextField label="Email" />);
    await user.tab();
    expect(screen.getByLabelText('Email')).toHaveFocus();
    rerender(<TextField label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });
});
