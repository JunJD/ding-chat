// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    AppBarTypeMap,
    Toolbar,
    useMediaQuery,
} from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { FC } from 'react';


const Header: FC = () => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // common header
    const mainHeader = (
        <Toolbar>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar: AppBarTypeMap['props'] = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: 54,
            bgcolor: 'background.default',
        },
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

export default Header;
