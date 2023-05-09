import { Box, Toolbar } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = ({children}) => {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            bgcolor: 'background.paper',
        }}>
            <Header />
            <Box
                component="main"
                sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout;