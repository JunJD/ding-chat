// material-ui
import { Box, IconButton, Link, useMediaQuery, useTheme } from '@mui/material';
import { /*GithubOutlined,*/ BulbOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useRecoilState } from 'recoil';
import Brightness2SharpIcon from '@mui/icons-material/Brightness2Sharp';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo } from 'react';
import { mainStore } from '../../../store/main';

const HeaderContent = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    // 控制开灯关灯的按钮
    const [mainState, setMainState] = useRecoilState(mainStore);
    const light = useMemo(() => mainState.light, [mainState.light]);
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    ml: { xs: 0, md: 1 }
                }}
            >
                <Link
                    href="/"
                    underline="none"
                    variant="h3"
                    color="primary"
                    sx={{ display: 'inline-flex', alignItems: 'center' }}
                >
                    叮AI
                </Link>
            </Box>

            {light ? (
                <LightModeOutlinedIcon
                color='primary'
                onClick={() => setMainState(pre => ({ ...pre, light: !light }))}
                />
            ) : (
                <Brightness2SharpIcon
                    color='primary'
                    onClick={() => setMainState(pre => ({ ...pre, light: !light }))}
                />
            )}

            {/* <Notification /> */}
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
