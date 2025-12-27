import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loading from '../app/loading';

describe('Loading Component', () => {
  it('renders loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
