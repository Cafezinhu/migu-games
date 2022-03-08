import { Rectangle } from "pixi.js";
import { Vector } from "./Vector";
export declare enum Anchor {
    TopLeft = 0,
    Top = 1,
    TopRight = 2,
    Left = 3,
    Center = 4,
    Right = 5,
    BottomLeft = 6,
    Bottom = 7,
    BottomRight = 8
}
export declare function getAnchorPoint(rectangle: Rectangle, anchor: Anchor): Vector;
