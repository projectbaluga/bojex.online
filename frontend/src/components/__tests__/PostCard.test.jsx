import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import PostCard from '../PostCard';

it('renders post content', () => {
  render(<PostCard id="1" author="me" content="hello" timestamp="now" />);
  expect(screen.getByText('hello')).toBeInTheDocument();
  expect(screen.getByText('me')).toBeInTheDocument();
});
