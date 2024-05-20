// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories } from "@ombiel/cm-tile-sdk/dev";

import PromedioTileFace from '../../../src/client/tiles/promedio-tile/components/promedio-tile-face';


const stories = storiesOf('Promedio | Tile Face / Just Text', module);

addTileFaceStories(stories,<PromedioTileFace text="Promedio" />);
