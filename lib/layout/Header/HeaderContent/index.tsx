// material-ui
import { Box, IconButton, Link, useMediaQuery, useTheme } from '@mui/material';
import { /*GithubOutlined,*/ BulbOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useRecoilState } from 'recoil';

import { useMemo } from 'react';
import { mainStore } from '../../../store/main';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    // 控制开灯关灯的按钮
    const [mainState, setMainState] = useRecoilState(mainStore);
    const light = useMemo(() => mainState.light, [mainState.light]);
    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/* <IconButton
                component={Link}
                href="https://github.com/JunJD"
                target="_blank"
                // 这是一个material-ui的属性，作用是去除点击时的水波纹效果
                disableRipple
                // 这是一个material-ui的属性，值为secondary时，背景色为主题色，字体颜色为白色，
                // 值为primary时，背景色为白色，字体颜色为主题色
                color="secondary"
                // 这是一个material-ui的属性，作用是设置鼠标悬浮时的提示文字
                title="欢迎访问我的github"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
            >
                <GithubOutlined />
            </IconButton> */}

            <IconButton
                component={Link}
                // 这是一个material-ui的属性，值为secondary时，背景色为主题色，字体颜色为白色
                color="primary"
                title={light ? '关灯' : '开灯'}
                onClick={() => setMainState({ ...mainState, light: !light })}
            >
                <BulbOutlined />
            </IconButton>

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
