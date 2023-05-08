import React, { FC, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { mainStore } from '../store/main';
import CustomShadows from './shadows';
import Palette from './palette';
import Typography from './typography';


interface ThemeCustomizationProps {
    children: React.ReactNode;
}

const ThemeCustomization: FC<ThemeCustomizationProps> = ({ children }) => {

    const { light, barScrollTop } = useRecoilValue(mainStore);
    
    // 主题
    const theme = Palette(light ? 'light' : 'dark');
    // 字体
    const themeTypography = Typography(`'Public Sans', sans-serif`);
    // 阴影
    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

    // 主题配置
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536,
                },
            },
            direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
            },
            palette: theme.palette,
            customShadows: {
                ...themeCustomShadows,
                barScrollTopShadow:
                    barScrollTop > 0
                        ? `1px -1px 20px -4px ${theme.palette.text.disabled}`
                        : 'none',
            },
            typography: themeTypography,
        }),
        [theme.palette, barScrollTop, themeCustomShadows, themeTypography],
    );

    const themes = createTheme(themeOptions);
    return (
        // 为了解决mui组件样式覆盖问题
        <StyledEngineProvider injectFirst>
            {/* 主题 */}
            <ThemeProvider theme={themes}>
                {/* 全局样式 */}
                <CssBaseline />
                {/* main! */}
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeCustomization;