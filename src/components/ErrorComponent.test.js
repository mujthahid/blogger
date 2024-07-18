// src/components/ErrorComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorComponent from './ErrorComponent';

describe('ErrorComponent', () => {
    test('renders the error message', () => {
        const errorMessage = 'This is an error message';
        render(<ErrorComponent message={errorMessage} />);
        const messageElement = screen.getByText(errorMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test('renders Box with correct styles', () => {
        const errorMessage = 'This is an error message';
        render(<ErrorComponent message={errorMessage} />);
        const boxElement = screen.getByTestId('error-box'); // Using data-testid for specific identification
        expect(boxElement).toHaveStyle('background-color: #ffebee');
        expect(boxElement).toHaveStyle('color: #b71c1c');
        expect(boxElement).toHaveStyle('padding: 10px');
        expect(boxElement).toHaveStyle('border: 1px solid #e57373');
        expect(boxElement).toHaveStyle('border-radius: 4px');
        expect(boxElement).toHaveStyle('margin-bottom: 10px');
    });
});
