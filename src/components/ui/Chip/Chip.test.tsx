import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders non-interactive label', () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Chip>Label</Chip>
      </ThemeProvider>,
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    unmount();
  });

  it('interactive variant is keyboard activatable', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Chip onClick={onClick}>Action</Chip>
      </ThemeProvider>,
    );
    const btn = screen.getByRole('button', { name: 'Action' });
    btn.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
    unmount();
  });
});
