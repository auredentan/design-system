import React, { Fragment, useState } from 'react';

import { Button, Themes } from 'LumX';

import { mdiPencil } from 'LumX/icons';

const IconButtonStory = () => {
    const [theme, setTheme] = useState(Themes.light);

    return (
        <Fragment>
            <Button
                theme={theme}
                leftIcon={mdiPencil}
                onClick={() => setTheme(theme === Themes.light ? Themes.dark : Themes.light)}
            >
                Hello
            </Button>
        </Fragment>
    );
};

export { IconButtonStory };
