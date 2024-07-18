// src/pages/BlogPostList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import BlogPostList from './BlogPostList';

jest.mock('axios');

const mockPosts = [
    {
        title: 'Post 1',
        description: 'Description of Post 1',
        author: 'Author 1',
        publishedAt: '2023-07-18T12:34:56Z',
        source: { name: 'Source 1' },
        content: 'Content of Post 1',
        urlToImage: 'http://example.com/image1.jpg',
        url: 'http://example.com/post1',
    },
    {
        title: 'Post 2',
        description: 'Description of Post 2',
        author: 'Author 2',
        publishedAt: '2023-07-19T12:34:56Z',
        source: { name: 'Source 2' },
        content: 'Content of Post 2',
        urlToImage: 'http://example.com/image2.jpg',
        url: 'http://example.com/post2',
    },
];

describe('BlogPostList', () => {
    beforeEach(() => {
        axios.get.mockClear();
    });

    test('renders posts', async () => {
        axios.get.mockResolvedValueOnce({ data: { articles: mockPosts, totalResults: 20 } });
        render(
            <MemoryRouter>
                <BlogPostList />
            </MemoryRouter>
        );

        // Wait for the first post to be rendered
        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
        });

        // Wait for the second post to be rendered
        await waitFor(() => {
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });

        // Pagination should be rendered
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    test('handles API error', async () => {
        const errorMessage = 'API Error';
        axios.get.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });
        render(
            <MemoryRouter>
                <BlogPostList />
            </MemoryRouter>
        );

        // Wait for the error message to be rendered
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });

        // Posts should not be rendered
        expect(screen.queryByRole('listitem')).toBeNull();
    });
});
