// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';
import { PaletteMode } from '@mui/material';

const Palette = (mode: PaletteMode) => {
    const colors = presetPalettes;

    const greyPrimary = [
        '#ffffff',
        '#fafafa',
        '#f5f5f5',
        '#f0f0f0',
        '#d9d9d9',
        '#bfbfbf',
        '#8c8c8c',
        '#595959',
        '#262626',
        '#141414',
        '#000000',
    ];
    const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    const greyConstant = ['#fafafb', '#e6ebf1'];

    colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

    const paletteColor = ThemeOption(colors);

    return createTheme({
        palette: {
            mode,
            common: {
                black: '#000',
                white: '#fff',
            },
            ...paletteColor,

            // 此处可以自定义主题色，我目前对于light和dark模式都使用了同一套主题色
            ...(mode === 'light'
                ? {
                      text: {
                          primary: paletteColor.grey[700],
                          secondary: paletteColor.grey[500],
                          disabled: paletteColor.grey[400],
                      },
                      action: {
                          disabled: paletteColor.grey[300],
                      },
                      divider: paletteColor.grey[200],
                      background: {
                          paper: paletteColor.grey[0],
                          default: paletteColor.grey[50],
                      },
                  }
                : {
                      text: {
                          primary: paletteColor.grey[100],
                          secondary: paletteColor.grey[300],
                          disabled: paletteColor.grey[400],
                      },
                      // primary: {
                      //     main: paletteColor.grey[100],
                      // },
                      // warning: {
                      //     main: paletteColor.grey[100],
                      // },
                      // info: {
                      //     main: paletteColor.grey[100],
                      // },
                      // error: {
                      //     main: paletteColor.grey[100],
                      // },
                      // success: {
                      //     main: paletteColor.grey[100],
                      // },

                      action: {
                          disabled: 'rgb(40, 36, 61)',
                          // hover: 'rgb(40, 36, 61)',
                          // selected: 'rgb(40, 36, 61)',
                          // disabledBackground: 'rgb(40, 36, 61)',
                          // hoverOpacity: 0.04,
                          // selectedOpacity: 0.08,
                          // disabledOpacity: 0.38,
                          // focus: 'rgb(40, 36, 61)',
                          // focusOpacity: 0.12,
                          // activatedOpacity: 0.12,
                      },
                      divider: 'rgb(40, 36, 61)',
                      background: {
                          paper: '#070809',
                          default: "#1a1c20",
                      },
                  }),
        },
    });
};

export default Palette;
