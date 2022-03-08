import { Rectangle } from "pixi.js";
import { Vector } from "./Vector";

export enum Anchor {TopLeft, Top, TopRight, Left, Center, Right, BottomLeft, Bottom, BottomRight};

export function getAnchorPoint(rectangle: Rectangle, anchor: Anchor): Vector{
    const points = [
        new Vector(0, 0),
        new Vector(0.5, 0),
        new Vector(1, 0),
        new Vector(0, 0.5),
        new Vector(0.5, 0.5),
        new Vector(1, 0.5),
        new Vector(0, 1),
        new Vector(0.5, 1),
        new Vector(1, 1)
    ];

    return points[anchor];
}