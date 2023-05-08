// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import React from 'react';
// import { chatGPTRequest } from '@/service';

const Search = () => {
    useEffect(() => {
        // 监听crtl+k事件 / mac监听command+k事件
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                const searchInput = document.querySelector(
                    "[placeholder='Ctrl + K']",
                ) as HTMLInputElement;
                e.preventDefault();
                // 聚焦到搜索框
                searchInput?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    // 当搜索框失焦点时，将输入框中的内容请求后台
    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // if (value) {
        //     const res = await chatGPTRequest(value);
        //     console.log(res);
        // }
    };

    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            {/* FormControl是一个包裹输入框的容器，可以设置输入框的宽度,提交表单时，会将输入框的值提交到后台 */}
            <FormControl
                sx={{ width: { xs: '100%', md: 224 } }}
                onBlur={handleBlur}
            >
                {/* OutlinedInput是一个输入框组件，可以设置输入框的大小，前后缀，提示文字，输入框的值等 */}
                <OutlinedInput
                    size="small"
                    // startAdornment是输入框前缀，endAdornment是输入框后缀
                    startAdornment={
                        // InputAdornment是一个输入框前后缀的容器，可以设置前后缀的位置
                        <InputAdornment position="start" sx={{ mr: 0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    // aria-describedby是一个属性，值为一个id，用于描述输入框的作用
                    aria-describedby="header-search-text"
                    // inputProps是一个属性，值为一个对象，用于设置输入框的属性
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    placeholder="搜索历史消息"
                />
            </FormControl>
        </Box>
    );
};

export default Search;
