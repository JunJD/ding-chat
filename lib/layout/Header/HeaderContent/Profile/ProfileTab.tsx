import { FC, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

// assets
import {
    EditOutlined,
    ProfileOutlined,
    LogoutOutlined,
    UserOutlined,
    WalletOutlined,
} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface ProfileTabProps {
    handleLogout: () => void;
}

const ProfileTab: FC<ProfileTabProps> = ({ handleLogout }) => {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <List
            component="nav"
            sx={{
                p: 0,
                '& .MuiListItemIcon-root': {
                    minWidth: 32,
                    color: theme.palette.grey[500],
                },
            }}
        >
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <EditOutlined />
                </ListItemIcon>
                <ListItemText primary="编辑个人信息" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>
                <ListItemText primary="查看个人信息" />
            </ListItemButton>

            <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
            >
                <ListItemIcon>
                    <ProfileOutlined />
                </ListItemIcon>
                <ListItemText primary="关联信息" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
            >
                <ListItemIcon>
                    <WalletOutlined />
                </ListItemIcon>
                <ListItemText primary="账单" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                onClick={handleLogout}
            >
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="退出登录" />
            </ListItemButton>
        </List>
    );
};

export default ProfileTab;
