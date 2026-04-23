// App.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// demo 4
describe('App', () => {
  test('shows Advanced Search when button is clicked', async () => {
    // Arrange → render App in its initial (basic) state
    render(<App />);

    // Assert initial state → basic search bar visible
    expect(screen.getByPlaceholderText(/search for fruits/i)).toBeInTheDocument();

    // Act → click the toggle button
    await userEvent.click(screen.getByRole('button', { name: /advanced search/i }));

    // Assert → advanced search view appears, basic search is gone
    expect(screen.getByText(/advanced fruit search/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/search for fruits/i)).not.toBeInTheDocument();
  });
});
