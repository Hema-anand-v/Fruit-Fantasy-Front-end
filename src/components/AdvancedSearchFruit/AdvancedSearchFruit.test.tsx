import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AdvancedSearchFruit from './AdvancedSearchFruit';
import axios from 'axios';

// mock on axios.get
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AdvancedSearchFruit', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset axios mock before each test
  });

  test('shows results when API returns data (success)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Mango', price: 120, unit: 'kg' },
        { id: 2, name: 'Apple', price: 100, unit: 'kg' },
      ],
    });

    render(<AdvancedSearchFruit />);

    // Fill in category and click Search
    await userEvent.type(screen.getByLabelText(/category/i), 'tropical');
    await userEvent.click(screen.getByRole('button', { name: /search fruits/i }));

    // Assert → mocked results are displayed
    expect(await screen.findByText(/Mango/i)).toBeInTheDocument();
    expect(await screen.findByText(/Apple/i)).toBeInTheDocument();
  });

  test('shows error when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<AdvancedSearchFruit />);

    await userEvent.type(screen.getByLabelText(/category/i), 'citrus');
    await userEvent.click(screen.getByRole('button', { name: /search fruits/i }));

    // Assert → error message appears
    expect(await screen.findByText(/Search failed/i)).toBeInTheDocument();
  });
});
