import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';

const BlogPostItem = ({ post }) => {
    const encodedTitle = encodeURIComponent(post.title);
    return (
        <Box display={'flex'} flexDirection={'column'} gap={2} border={'1px solid #ccc'} p={2} borderRadius={5} position={'relative'} bgcolor={'white'}>
            <Typography variant='h5' fontWeight={'bold'}>{post.title}</Typography>
            <Typography variant='body'>{post.description}</Typography>
            <Typography variant='subtitle2' fontStyle={'italic'} position={'absolute'} bottom={"10%"} right={"5%"}>{new Date(post.publishedAt).toDateString()}</Typography>
            <Link href={`/post/${encodedTitle}`} targer={'_blank'} rel={'noopener noreferrer'} underline='none'>
                <Button variant="contained" color="primary" sx={{
                    backgroundColor: 'grey.700',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'grey.900',
                    },
                    padding: '10px 20px',
                    fontSize: '12px',
                    borderRadius: '8px',
                }} >
                    Read More
                </Button>

            </Link>
        </Box>
    );
};

export default BlogPostItem;
