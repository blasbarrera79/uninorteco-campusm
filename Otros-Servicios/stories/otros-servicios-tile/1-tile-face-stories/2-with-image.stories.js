// eslint-disable-next-line no-unused-vars
import React from 'react';
import { storiesOf } from '@storybook/react';

// import { withKnobs } from '@storybook/addon-knobs';
import { addTileFaceStories,generateImage } from "@ombiel/cm-tile-sdk/dev";

import OtrosServiciosTileFace from '../../../src/client/tiles/otros-servicios-tile/components/otros-servicios-tile-face';

const image = generateImage("My Tile ","#556666");

const stories = storiesOf('Otros Servicios | Tile Face / With Image', module);

addTileFaceStories(stories,<OtrosServiciosTileFace image={image} text="Otros Servicios" />);
