import React, { useState, useEffect} from 'react';
import BlogPostItem from '../components/BlogPostItem';
import { Box, Container } from '@mui/material';
import Loader from '../components/CircularProgress';
import axios from 'axios';
import ErrorComponent from '../components/ErrorComponent';
import Pagination from '../components/Pagination';

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pagesToShow = 10; // Number of pages to show at a time
    const [error,setError] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?&q=messi&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${currentPage}&pageSize=10`);
                setPosts(response.data.articles);
                // Calculate total pages based on total results
                const totalResults = response.data.totalResults;
                setTotalPages(Math.ceil(totalResults / 10)); // Assuming pageSize is 10
            } catch (err) {
                setError(err.response.data.message);
            }
        };
        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    if(error) return <ErrorComponent message={error}/>;

    return (
        <>
            {posts?.length === 0 ? <Loader /> : (
                <Container>
                    <Box display="flex" flexDirection="column" gap={3} p={5} backgroundColor="#f5f5f5">
                        {posts?.map((post, index) => (
                            <BlogPostItem key={index} post={post} />
                        ))}
                        <Box display="flex" justifyContent="center" marginTop={5}>
                         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} pagesToShow={pagesToShow} />
                    </Box>
                    </Box>
                    
                </Container>
            )}
        </>
    );
};

export default BlogPostList;
