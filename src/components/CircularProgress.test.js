// src/components/Loader.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './Loader';
import { Box, CircularProgress } from '@mui/material';

describe('Loader', () => {
    test('renders CircularProgress component', () => {
        render(<Loader />);
        const circularProgressElement = screen.getByRole('progressbar');
        expect(circularProgressElement).toBeInTheDocument();
    });

    test('renders Box with correct styles', () => {
        render(<Loader />);
        const boxElement = screen.getByRole('presentation');
        expect(boxElement).toHaveStyle('display: flex');
        expect(boxElement).toHaveStyle('justify-content: center');
        expect(boxElement).toHaveStyle('align-items: center');
        expect(boxElement).toHaveStyle('height: 100vh');
    });
});
