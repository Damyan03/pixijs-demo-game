import { clamp } from "../../../engine/utils/maths";
import config from "../../gameConfig.json";

const { gameSize, layouts } = config;
const { side, stacked } = layouts;

const plateRoom = side.rightEdge + side.plateMargin;
const sideSafeWidth = plateRoom - side.plate.closestX;

/** Slides the plate toward the cage as the sides of the window crop */
function getSidePlateX(viewWidth: number) {
  return clamp(plateRoom - viewWidth, side.plate.x, side.plate.closestX);
}

/** Works out the scene layout for a window size */
export function computeLayout(width: number, height: number) {
  //narrow windows move the plate above the cage
  const isStacked = width / height < sideSafeWidth / stacked.safeHeight;
  const layout = isStacked ? stacked : side;

  //fits the game in the window, wide windows fill the width to cover the page
  const coverWidthScale = width / gameSize.width;
  const fitScale = Math.min(
    width / (isStacked ? stacked.safeWidth : sideSafeWidth),
    height / (isStacked ? stacked.safeHeight : gameSize.height),
  );
  const scale = Math.max(coverWidthScale, fitScale);

  const centerX = width * 0.5;
  const viewWidth = width / scale;
  const plateX = isStacked ? stacked.plate.x : getSidePlateX(viewWidth);

  //keeps the cage centered until the plate needs the room
  const x = Math.max(centerX, (side.plateMargin - plateX) * scale);

  const viewCenterX = (centerX - x) / scale;

  const tigerScale = Math.min(
    config.tiger.leapMaxScale,
    viewWidth / config.tiger.fitWidth,
  );

  return {
    scale,
    x,
    y: height * 0.5,
    plateX,
    plateY: layout.plate.y,
    //grows the background when the window is taller than the image
    backgroundHeight: Math.max(gameSize.height, height / scale),
    //the tiger and text stay centered in the window and shrink to fit it
    tigerLeap: {
      x: viewCenterX + config.tiger.leapOffsetX * tigerScale,
      y: layout.tigerLeapY,
      scale: tigerScale,
    },
    winTextX: viewCenterX,
    winTextScale: Math.min(
      layout.winTextScale,
      viewWidth / config.winText.fitWidth,
    ),
  };
}
