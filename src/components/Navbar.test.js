// src/components/Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';

describe('Navbar', () => {
    test('renders the Navbar with correct text', () => {
        render(<Navbar />);
        const navbarElement = screen.getByText(/Blogger/i);
        expect(navbarElement).toBeInTheDocument();
    });

    test('renders the Typography with correct styles', () => {
        render(<Navbar />);
        const typographyElement = screen.getByText(/Blogger/i);
        expect(typographyElement).toHaveStyle('font-weight: 700');
        expect(typographyElement).toHaveStyle('font-style: oblique');
        expect(typographyElement).toHaveStyle('color: black');
    });

    test('contains a Link with the correct href attribute', () => {
        render(<Navbar />);
        const linkElement = screen.getByRole('link', { name: /Blogger/i });
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
