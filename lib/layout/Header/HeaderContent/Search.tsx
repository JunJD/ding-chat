// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import React from 'react';
import { chatGPTRequest } from '@/service';

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
        const res = await chatGPTRequest.post({
            url: '/v1/chat/completions',
            data: {
                messages: [
                    {
                        role: 'user',
                        content: '前端有哪些框架',
                    },
                    {
                        role: 'assistant',
                        content:
                            '1. AngularJS：由Google开发，用于构建动态Web应用程序。\n2. React：由Facebook推出，提供高效的虚拟DOM，用于构建可重用的组件化UI。\n3. Vue.js：一个轻量级的JavaScript框架，易于学习和集成。\n4. Ember.js：一个强大的框架，用于构建大型单页面应用程序。\n5. Backbone.js：一个基于MVC模式的框架，简单易用，可用于Web应用程序和移动应用程序。\n6. jQuery：一个流行的JavaScript库，用于简化DOM操作和AJAX请求，提高开发速度。\n7. Bootstrap：一个基于CSS和JavaScript的前端框架，可快速构建响应式Web应用程序。\n8. Materialize：一个响应式的前端框架，基于Google的Material Design准则，提供美观的UI组件。\n9. Semantic UI：一个半自动的UI框架，提供具有语义性的HTML标记和可定制的主题。\n10. Foundation：一个响应式的前端框架，提供可定制的UI组件和布局。',
                    },
                    {
                        role: 'user',
                        content: '第10个是什么',
                    },
                ],
            },
        });
        // if (res.success) {
        console.table({
            prompt: e.target.value,
            res: res.result,
        });
        e.target.value = '';
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
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    // aria-describedby是一个属性，值为一个id，用于描述输入框的作用
                    aria-describedby="header-search-text"
                    // inputProps是一个属性，值为一个对象，用于设置输入框的属性
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    placeholder="Ctrl + K"
                />
            </FormControl>
        </Box>
    );
};

export default Search;
