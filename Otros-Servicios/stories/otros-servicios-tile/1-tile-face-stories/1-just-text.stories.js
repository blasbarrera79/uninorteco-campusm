// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories } from "@ombiel/cm-tile-sdk/dev";

import OtrosServiciosTileFace from '../../../src/client/tiles/otros-servicios-tile/components/otros-servicios-tile-face';


const stories = storiesOf('Otros Servicios | Tile Face / Just Text', module);

addTileFaceStories(stories,<OtrosServiciosTileFace text="Otros Servicios" />);
