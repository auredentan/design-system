import React from 'react';

import '../src/core/style/lumx-theme-lumapps.scss';

import { storiesOf } from '@storybook/react';

import { IconButtonStory } from './components/button/icon-button.stories.tsx';

storiesOf('Button', module).add('Icon Button', () => <IconButtonStory />);
