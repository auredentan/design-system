import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import theme from './theme';

addParameters({
    options: {
        theme,
    },
});

// Automatically import all files ending by `*.stories.js` in the `stories` folder.
const req = require.context('../stories', true, /\.stories\.(js|jsx|ts|tsx)$/);
function loadStories() {
    addDecorator(withInfo);
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
