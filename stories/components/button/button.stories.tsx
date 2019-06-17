import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Button, Themes } from 'LumX';

import { DOMAIN } from '.';
import notes from './button.md';

const ButtonStory = () => {
    const [theme, setTheme] = useState(Themes.light);

    return (
        <Fragment>
            <Button theme={theme} onClick={() => setTheme(theme === Themes.light ? Themes.dark : Themes.light)}>
                Hello
            </Button>
        </Fragment>
    );
};

storiesOf(DOMAIN, module).add('Clickable', () => <ButtonStory />, {
    info: { inline: true },
    notes: { markdown: notes },
});

export { ButtonStory };
