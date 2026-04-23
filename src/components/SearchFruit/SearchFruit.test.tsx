// SearchFruit.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchFruit from './SearchFruit';

describe('SearchFruit', () => {
  test('calls onSearchFruit when typing text', async () => {
    const handleSearch = jest.fn();   // mock function
    const handleClear = jest.fn();    // mock function

    render(<SearchFruit searchText=""
      onSearchFruit={handleSearch}
      onClearSearchFruit={handleClear} />);

    // Act → simulate typing
    await userEvent.type(screen.getByPlaceholderText(/search for fruits/i), 'apple');

    // Assert → handler called
    expect(handleSearch).toHaveBeenCalled();
  });

  test('calls onClearSearchFruit when Clear button is clicked', async () => {
    const handleSearch = jest.fn();
    const handleClear = jest.fn();

    render(
      <SearchFruit
        searchText="apple"
        onSearchFruit={handleSearch}
        onClearSearchFruit={handleClear}
      />
    );

    // Act → click the Clear button
    await userEvent.click(screen.getByRole('button', { name: /clear/i }));

    // Assert → clear handler is called
    expect(handleClear).toHaveBeenCalled();
  });
});
