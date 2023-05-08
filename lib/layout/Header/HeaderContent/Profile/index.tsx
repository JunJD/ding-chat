import { FC, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Direction,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

// project import
import MainCard from '././../../../../components/MainCard';
import Transitions from '././../../../../component/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
// import Lottie from './../../../../compontents/lottie';
// import JSONData from './../../../../../public/137299-code-or-terminal.json';

import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { authStore } from './../../../../store/auth';
import { useResetRecoilState } from 'recoil';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    dir?: Direction;
}

// tab panel wrapper
const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`,
    };
}

const Profile = () => {
    const theme = useTheme();
    const resetAuth = useResetRecoilState(authStore);
    const handleLogout = async () => {
        resetAuth();
    };

    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    color: open ? 'primary.main' : 'grey.500',
                    borderRadius: 1,
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ p: 0.5 }}
                >
                    <Avatar alt="profile user" sx={{ width: 32, height: 32 }}>
                        {/* <Lottie
                            animationData={JSONData}
                            height={60}
                            width={60}
                        /> */}
                    </Avatar>
                    <Typography variant="subtitle1">Coder Jun</Typography>
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
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
                        {
                            open && (
                                <Paper
                                    sx={{
                                        boxShadow: theme.shadows[2],
                                        width: 290,
                                        minWidth: 240,
                                        maxWidth: 290,
                                        [theme.breakpoints.down('md')]: {
                                            maxWidth: 250,
                                        },
                                    }}
                                >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MainCard
                                            elevation={0}
                                            border={false}
                                            content={false}
                                        >
                                            <CardContent sx={{ px: 2.5, pt: 3 }}>
                                                <Grid
                                                    container
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        <Stack
                                                            direction="row"
                                                            spacing={1.25}
                                                            alignItems="center"
                                                        >
                                                            <Avatar
                                                                alt="profile user"
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                }}
                                                            >
                                                                {/* <Lottie
                                                                    animationData={
                                                                        JSONData
                                                                    }
                                                                /> */}
                                                            </Avatar>
                                                            <Stack>
                                                                <Typography variant="h6">
                                                                    Code Jun
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="textSecondary"
                                                                >
                                                                    超级管理员
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton
                                                            size="large"
                                                            color="secondary"
                                                            onClick={handleLogout}
                                                        >
                                                            <LogoutOutlined />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            {open && (
                                                <>
                                                    <Box
                                                        sx={{
                                                            borderBottom: 1,
                                                            borderColor: 'divider',
                                                        }}
                                                    >
                                                        <Tabs
                                                            variant="fullWidth"
                                                            value={value}
                                                            onChange={handleChange}
                                                            aria-label="profile tabs"
                                                        >
                                                            <Tab
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    justifyContent:
                                                                        'center',
                                                                    alignItems:
                                                                        'center',
                                                                    textTransform:
                                                                        'capitalize',
                                                                }}
                                                                icon={
                                                                    <UserOutlined
                                                                        style={{
                                                                            marginBottom: 0,
                                                                            marginRight:
                                                                                '10px',
                                                                        }}
                                                                    />
                                                                }
                                                                label="个人信息"
                                                                {...a11yProps(0)}
                                                            />
                                                            <Tab
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    justifyContent:
                                                                        'center',
                                                                    alignItems:
                                                                        'center',
                                                                    textTransform:
                                                                        'capitalize',
                                                                }}
                                                                icon={
                                                                    <SettingOutlined
                                                                        style={{
                                                                            marginBottom: 0,
                                                                            marginRight:
                                                                                '10px',
                                                                        }}
                                                                    />
                                                                }
                                                                label="设置"
                                                                {...a11yProps(1)}
                                                            />
                                                        </Tabs>
                                                    </Box>
                                                    <TabPanel
                                                        value={value}
                                                        index={0}
                                                        dir={theme.direction}
                                                    >
                                                        <ProfileTab
                                                            handleLogout={
                                                                handleLogout
                                                            }
                                                        />
                                                    </TabPanel>
                                                    <TabPanel
                                                        value={value}
                                                        index={1}
                                                        dir={theme.direction}
                                                    >
                                                        <SettingTab />
                                                    </TabPanel>
                                                </>
                                            )}
                                        </MainCard>
                                    </ClickAwayListener>
                                </Paper>
                            )
                        }
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
