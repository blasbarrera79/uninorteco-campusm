import React from "react";

import {
  Tile,
  TileBoard,
  // TileFace,
  // HBlock,
  // VBlock,
  // TextBox,
  // TextLine,
  // ImageBox,
  // Badge,
  // Layer,
  // SvgBox,
  
  useTileProps,
  // useCallback,
  // useCycle,
  // useFetch,
  // useMemo,
  // useReducer,
  // useRef,
  // useServerAction,
  // useStash,
  // useState,
  // useTicker,
  // useTileConfig,
  // useTimedCycle,
  // useTimer,

} from "@ombiel/cm-tile-sdk";

import OtrosServiciosTileFace from "./otros-servicios-tile-face";

export default function OtrosServiciosTile() {
  
  const tileProps = useTileProps();
  const {content: {text,image,icon}} = tileProps;

  return (
    <Tile>
      <TileBoard>
        <OtrosServiciosTileFace 
          key={`${text}_${image}`} 
          text={text} 
          image={image} 
          icon={icon} 
        />
      </TileBoard>
    </Tile>
  );
}
