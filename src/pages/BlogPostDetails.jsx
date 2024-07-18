import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/CircularProgress';
import { Box, Typography, Link, Container } from '@mui/material';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import axios from 'axios';
import ErrorComponent from '../components/ErrorComponent';

const BlogPostDetails = () => {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_NEWSAPI_API_KEY;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${decodedTitle}&apiKey=${apiKey}`);
                const selectedPost = response.data.articles.find(article => article.title === decodedTitle);
                if (selectedPost) {
                    setPost(selectedPost);
                } else {
                    setError(`Post with title '${decodedTitle}' not found.`);
                }
            } catch (err) {
                setError(err.message); // Handle error responses or network issues
            }
        };

        if (decodedTitle) {
            fetchPost();
        }

    }, [decodedTitle, apiKey]);


    if (error) return <ErrorComponent message={error} />
    if (!post) return <Loader />
    return (
        <Container>
            <Box position={'relative'} display={'flex'} flexDirection={'column'} gap={3} p={{ xs: 5, sm: 8, md: 15 }} backgroundColor={'#f5f5f5'}>
                <Link position={'absolute'} top={'15px'} left={'15px'} href="/blogger"><ForwardRoundedIcon sx={{ color: 'black', transform: 'rotate(180deg)', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' } }} /></Link>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, justifyContent: 'space-between', paddingTop: { xs: '10px', sm: '10px', md: '10px', lg: '10px' } }}>
                    <Box bgcolor={'black'} color={'white'} p={2} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Typography variant='h5' fontWeight={'bold'} fontSize={{ xs: '15px', sm: '18px', md: '21px', lg: '24px' }} >{post.title}</Typography>
                        <Box display={'flex'} gap={2}>
                            <Typography variant='subtitle2' component={'p'} fontSize={{ xs: '8px', sm: '10px', md: '12px', lg: '12px' }} fontWeight={'bold'} color={'#727281'}  >{post.author}</Typography>
                            <Typography variant='subtitle2' component={'p'} fontSize={{ xs: '8px', sm: '10px', md: '12px', lg: '12px' }} fontStyle={'italic'}  >{new Date(post.publishedAt).toDateString()}</Typography>
                            <Typography variant='subtitle2' component={'p'} fontSize={{ xs: '8px', sm: '10px', md: '12px', lg: '12px' }}   >Source : {post.source.name}</Typography>
                        </Box>

                        <Typography variant='body2' component={'p'} color={'#727281'} marginTop={2} fontWeight={'bold'} fontSize={{ xs: '10px', sm: '12px', md: '15px', lg: '18px' }} >{post.description} </Typography>

                    </Box>
                    <Box component={'img'}
                        sx={{
                            width: { xs: '100%', sm: '100%', md: '50%' },
                            height: { xs: '50%', sm: '50%', md: 'auto', },
                            boxShadow: 3,
                            objectFit: 'cover',
                            flex: 1
                        }}
                        src={post.urlToImage} alt={post.title} />
                </Box>

                <Typography variant='body1' component={'p'} fontSize={{ xs: '10px', sm: '12px', md: '15px', lg: '18px' }} marginTop={5}>{post.content}</Typography>
                <Box>
                    <Typography variant='subtitle1' fontSize={{ xs: '10px', sm: '12px', md: '15px', lg: '18px' }} >See the full article here : </Typography>
                    <Link href={post.url} target={'_blank'} rel={'noopener noreferrer'} fontSize={{ xs: '10px', sm: '12px', md: '15px', lg: '18px' }}>{post.url}</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default BlogPostDetails;
