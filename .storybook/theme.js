import { create } from '@storybook/theming';

export default create({
    base: 'light',

    colorPrimary: 'hotpink',
    colorSecondary: 'pink',

    // UI
    appBg: 'white',
    appContentBg: 'silver',
    appBorderColor: 'grey',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: 'black',
    barBg: 'hotpink',

    // Form colors
    inputBg: 'green',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'My custom storybook',
    brandUrl: 'https://lumapps.com',
    brandImage: 'https://www.lumapps.com/wp-content/uploads/2018/08/Lumapps-logo.svg',
});
