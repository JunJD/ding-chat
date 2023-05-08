import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    ClickAwayListener,
    IconButton,
    Paper,
    Popper,
    Toolbar,
} from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
import Transitions from '@/compontents/@extended/Transitions';

// assets
import { MoreOutlined } from '@ant-design/icons';

const MobileSection = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<any>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    component="span"
                    // 这是一个material-ui的属性，作用是去除点击时的水波纹效果
                    disableRipple
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <MoreOutlined />
                </IconButton>
            </Box>
            <Popper
                // 这是一个material-ui的属性，作用是设置弹出框的位置
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                // disablePortal是一个material-ui的属性，作用是设置弹出框是否在portal中渲染，portal是一个react的概念，可以理解为一个独立的DOM树
                disablePortal
                style={{
                    width: '100%',
                }}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper sx={{ boxShadow: theme.shadows[2] }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <AppBar color="inherit">
                                    <Toolbar>
                                        <Search />
                                        <Profile />
                                    </Toolbar>
                                </AppBar>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default MobileSection;
