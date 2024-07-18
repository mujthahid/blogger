// src/components/Navbar.js

import { AppBar, Toolbar, Typography, Link } from '@mui/material';




const Navbar = () => {

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#f5f5f5', color: '#333', zIndex: 999, padding: '10px' }}>
            <Toolbar>
                <Link href={'/'} underline={'none'}>
                    <Typography variant="h5" fontWeight={'bold'} fontStyle={'oblique'} color={'black'} style={{ flexGrow: 1 }}>
                        Blogger
                    </Typography>
                </Link>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
