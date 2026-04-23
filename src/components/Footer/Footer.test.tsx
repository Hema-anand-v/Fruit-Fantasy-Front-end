import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders footer landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('shows copyright text', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    // Matches "© 2024 FruitFantasy" (© can be &copy; in source)
    expect(within(footer).getByText(/©?\s*2024\s+FruitFantasy/i)).toBeInTheDocument();
  });

  test('has 3 social links with correct targets and hrefs', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const links = within(footer).getAllByRole('link');
    expect(links).toHaveLength(3);

    const hrefs = links.map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        'https://facebook.com',
        'https://instagram.com',
        'https://linkedin.com',
      ])
    );

    links.forEach(a => {
      expect(a).toHaveAttribute('target', '_blank');
    });
  });
});
