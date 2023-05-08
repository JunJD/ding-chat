import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from '@mui/material';

// project import
import MainCard from './../../../compontents/MainCard';
import Transitions from '@/compontents/@extended/Transitions';

// assets
import {
    BellOutlined,
    CloseOutlined,
    GiftOutlined,
    MessageOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import React from 'react';

interface NotificationItem {
    id: number;
    type: 'success' | 'warning' | 'error' | 'primary';
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    secondary: string;
}

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none',
};

const Notification = () => {
    const [notificationQueue, setNotification] = useState<
        Array<NotificationItem>
    >([]);
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        open &&
            setNotification([
                {
                    id: 1,
                    type: 'success',
                    title: '新订单已收到',
                    subtitle: '1小时前',
                    icon: <GiftOutlined />,
                    secondary: 'Nike Air Max 270',
                },
                {
                    id: 2,
                    type: 'warning',
                    title: '新消息',
                    subtitle: '2小时前',
                    icon: <MessageOutlined />,
                    secondary: '来自约翰·多伊的：你好，今天晚上有...',
                },
                {
                    id: 3,
                    type: 'error',
                    title: '您的物品已发货',
                    subtitle: '5小时前',
                    icon: <SettingOutlined />,
                    secondary: 'Nike air max 270',
                },
                {
                    id: 4,
                    type: 'primary',
                    title: '新订单已收到',
                    subtitle: '1天前',
                    icon: <GiftOutlined />,
                    secondary: 'Nike classic cortez',
                },
            ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        // 判断点击的元素是否是当前元素的子元素
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                aria-label="open profile"
                ref={anchorRef}
                // 用于标识当前元素的id
                aria-controls={open ? 'profile-grow' : undefined}
                // 用于标识当前元素的状态
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge badgeContent={4} color="primary">
                    <BellOutlined />
                </Badge>
            </IconButton>
            {/* Popper是一个弹出层 */}
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                // anchorEl: 根据anchorRef示例元素的位置来定位弹出层
                anchorEl={anchorRef.current}
                // role: 用于标识当前元素的角色
                role={undefined}
                // transition: 用于设置弹出层的动画效果，还有其他的动画效果：zoom, fade, grow, slide
                transition
                // disablePortal: 用于设置弹出层是否渲染到body元素下
                disablePortal
                // popperOptions: 用于设置弹出层的样式
                popperOptions={{
                    // modifiers: 用于设置弹出层的偏移量
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9],
                            },
                        },
                    ],
                }}
            >
                {/* TransitionProps: 用于设置弹出层的动画效果 */}
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.shadows[2],
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                // 当屏幕宽度小于md时，弹出层的宽度为285px
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285,
                                },
                            }}
                        >
                            {/* ClickAwayListener: 用于监听点击事件，当点击的元素不是当前元素的子元素时，执行handleClose方法 */}
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="消息队列"
                                    // 用于设置弹出层的高度
                                    elevation={0}
                                    // 用于设置弹出层的边框
                                    border={false}
                                    // 用于设置弹出层的内边距
                                    content={false}
                                    // 用于设置弹出层的外边距
                                    secondary={
                                        // IconButton: 用于设置关闭按钮
                                        <IconButton
                                            size="small"
                                            onClick={handleToggle}
                                        >
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            // 用于设置弹出层的内边距
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root':
                                                    {
                                                        ...actionSX,
                                                        position: 'relative',
                                                    },
                                            },
                                        }}
                                    >
                                        {notificationQueue.map((item) => (
                                            <React.Fragment key={item.id}>
                                                {/* ListItemButton: 用于设置列表项 */}
                                                <ListItemButton>
                                                    {/* ListItemAvatar: 用于设置列表项的头像 */}
                                                    <ListItemAvatar>
                                                        {/* Avatar: 用于设置头像 */}
                                                        <Avatar
                                                            sx={{
                                                                color: `${item.type}.main`,
                                                                bgcolor: `${item.type}.lighter`,
                                                            }}
                                                        >
                                                            {item.icon}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    {/* ListItemText: 用于设置列表项的文本 */}
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h6">
                                                                {item.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            item.secondary
                                                        }
                                                    />
                                                    {/* ListItemSecondaryAction: 用于设置列表项的副文本 */}
                                                    <ListItemSecondaryAction>
                                                        <Typography
                                                            variant="caption"
                                                            noWrap
                                                        >
                                                            {item.subtitle}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItemButton>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                        <ListItemButton
                                            sx={{
                                                textAlign: 'center',
                                                py: `${12}px !important`,
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        color="primary"
                                                    >
                                                        查看所有
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
