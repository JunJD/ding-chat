import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import {
    ModelTraining,
    VoiceChat,
    RotateLeft
} from '@mui/icons-material';

// assets
import {
    CommentOutlined,
    LockOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        console.log(selectedIndex);
        // const response = await fetch("/api/chat", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         authorization: "Bearer " + openaikey,
        //     },
        // });
    }, [selectedIndex]);
    

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
                    <ModelTraining
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary="Model Config" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <VoiceChat
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary="Context Messages" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => {
                    localStorage.setItem("embeddingStore", JSON.stringify({}));
                    handleListItemClick(event, 2)
                }}
            >
                <ListItemIcon>
                    <RotateLeft
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary="清空上传数据" />
            </ListItemButton>

            <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
            >
                <ListItemIcon>
                    <CommentOutlined />
                </ListItemIcon>
                <ListItemText primary="反馈" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
            >
                <ListItemIcon>
                    <UnorderedListOutlined />
                </ListItemIcon>
                <ListItemText primary="历史" />
            </ListItemButton>
        </List>
    );
};

export default SettingTab;
