import { ForwardedRef, forwardRef } from 'react';

// material-ui
import { Fade, Box, Grow } from '@mui/material';

interface TransitionsProps {
    children: React.ReactNode;
    position?:
        | 'top-right'
        | 'top'
        | 'bottom-left'
        | 'bottom-right'
        | 'bottom'
        | 'top-left';
    type?: 'grow' | 'fade';
}

const Transitions = (
    { children, position, type, ...others }: TransitionsProps,
    ref: ForwardedRef<any>,
) => {
    let positionSX = {
        transformOrigin: '0 0 0',
    };

    switch (position) {
        case 'top-right':
        case 'top':
        case 'bottom-left':
        case 'bottom-right':
        case 'bottom':
        case 'top-left':
        default:
            positionSX = {
                transformOrigin: '0 0 0',
            };
            break;
    }

    return (
        <Box ref={ref}>
            {type === 'grow' && (
                <Grow {...others}>
                    <Box sx={positionSX}>{children}</Box>
                </Grow>
            )}
            {type === 'fade' && (
                <Fade
                    {...others}
                    timeout={{
                        appear: 0,
                        enter: 300,
                        exit: 150,
                    }}
                >
                    <Box sx={positionSX}>{children}</Box>
                </Fade>
            )}
        </Box>
    );
};

export default forwardRef(Transitions);
