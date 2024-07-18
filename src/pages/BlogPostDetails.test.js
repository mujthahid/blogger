// src/pages/BlogPostDetails.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BlogPostDetails from './BlogPostDetails';
import Loader from '../components/CircularProgress';
import ErrorComponent from '../components/ErrorComponent';

jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/post/:title" element={ui} />
            </Routes>
        </MemoryRouter>
    );
};

describe('BlogPostDetails', () => {
    const mockPost = {
        title: 'Test Title',
        author: 'John Doe',
        publishedAt: '2023-07-18T12:34:56Z',
        source: { name: 'Test Source' },
        description: 'Test Description',
        content: 'Test Content',
        urlToImage: 'http://example.com/image.jpg',
        url: 'http://example.com/full-article',
    };

    test('renders loading state initially', () => {
        axios.get.mockResolvedValueOnce({ data: { articles: [] } });
        renderWithRouter(<BlogPostDetails />, { route: `/post/${encodeURIComponent(mockPost.title)}` });
        
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders error state', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        renderWithRouter(<BlogPostDetails />, { route: `/post/${encodeURIComponent(mockPost.title)}` });

        expect(await screen.findByText('Network Error')).toBeInTheDocument();
    });

    test('renders post details', async () => {
        axios.get.mockResolvedValueOnce({ data: { articles: [mockPost] } });
        renderWithRouter(<BlogPostDetails />, { route: `/post/${encodeURIComponent(mockPost.title)}` });

        expect(await screen.findByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.author)).toBeInTheDocument();
        expect(screen.getByText(new Date(mockPost.publishedAt).toDateString())).toBeInTheDocument();
        expect(screen.getByText(`Source : ${mockPost.source.name}`)).toBeInTheDocument();
        expect(screen.getByText(mockPost.description)).toBeInTheDocument();
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: mockPost.url })).toHaveAttribute('href', mockPost.url);
    });

    test('displays not found error for non-existing post', async () => {
        axios.get.mockResolvedValueOnce({ data: { articles: [] } });
        renderWithRouter(<BlogPostDetails />, { route: `/post/NonExistingPost` });

        expect(await screen.findByText("Post with title 'NonExistingPost' not found.")).toBeInTheDocument();
    });
});
