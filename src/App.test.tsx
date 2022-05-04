import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders today birthdays', () => {
  render(<App />);
  const linkElement = screen.getByText(/Today's Birthdays/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders upcoming birthdays', () => {
  render(<App />);
  const linkElement = screen.getByText(/Upcoming Birthdays/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/Add/i);
  expect(linkElement).toBeInTheDocument();
});
