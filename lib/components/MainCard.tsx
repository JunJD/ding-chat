import React, { forwardRef, ForwardedRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardHeader,
    CardProps,
    Divider,
    Typography,
} from '@mui/material';

// header style
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

export interface MainCardProps extends Omit<CardProps, 'content'> {
    border?: boolean;
    boxShadow?: boolean;
    children?: React.ReactNode;
    content?: boolean;
    contentSX?: object;
    darkTitle?: boolean;
    divider?: boolean;
    elevation?: number;
    secondary?: React.ReactNode;
    shadow?: boolean;
    sx?: object;
    title?: string;
    codeHighlight?: boolean;
}

const MainCard = (
    {
        border = true,
        children,
        content = true,
        contentSX = {},
        darkTitle,
        divider = true,
        elevation,
        secondary,
        sx = {},
        title,
        ...others
    }: MainCardProps,
    ref: ForwardedRef<any>,
) => {
    const theme = useTheme();

    return (
        <Card
            elevation={elevation || 0}
            ref={ref}
            {...others}
            sx={{
                ...sx,
                borderRadius: 2,
                '& pre': {
                    m: 0,
                    p: 2,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '0.75rem',
                },
            }}
        >
            {/* card header and action */}
            {!darkTitle && title && (
                <CardHeader
                    sx={headerSX}
                    titleTypographyProps={{ variant: 'subtitle1' }}
                    title={title}
                    action={secondary}
                />
            )}
            {darkTitle && title && (
                <CardHeader
                    sx={headerSX}
                    title={<Typography variant="h3">{title}</Typography>}
                    action={secondary}
                />
            )}

            {/* content & header divider */}
            {title && divider && <Divider />}

            {/* card content */}
            {content && <CardContent sx={contentSX}>{children}</CardContent>}
            {!content && children}
        </Card>
    );
};

export default forwardRef(MainCard);
