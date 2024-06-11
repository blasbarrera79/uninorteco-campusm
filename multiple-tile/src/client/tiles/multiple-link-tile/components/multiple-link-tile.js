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

import MultipleLinkTileFace from "./multiple-link-tile-face";

export default function MultipleLinkTile() {
  
  const tileProps = useTileProps();
  const {content: {text,image,icon}} = tileProps;

  return (
    <Tile>
      <TileBoard>
        <MultipleLinkTileFace 
          key={`${text}_${image}`} 
          text={text} 
          image={image} 
          icon={icon} 
        />
      </TileBoard>
    </Tile>
  );
}
