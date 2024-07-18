import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogPostItem from './BlogPostItem';
import { BrowserRouter } from 'react-router-dom';

const post = {
    title: 'Test Post',
    description: 'This is a test description',
    publishedAt: '2024-07-18T11:30:00Z',
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
};

describe('BlogPostItem', () => {
    test('button has correct styles', () => {
        renderWithRouter(<BlogPostItem post={post} />);
        const buttonElement = screen.getByRole('button', { name: /read more/i });
        expect(buttonElement).toHaveStyle('background-color: rgb(33, 33, 33)'); // Update to match actual color
        expect(buttonElement).toHaveStyle('color: white');
    });
});
