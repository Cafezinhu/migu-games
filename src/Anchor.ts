import { Rectangle } from "pixi.js";
import { Vector } from "./Vector";

export enum Anchor {TopLeft, Top, TopRight, Left, Center, Right, BottomLeft, Bottom, BottomRight};

export function getAnchorPoint(rectangle: Rectangle, anchor: Anchor): Vector{
    const points = [
        new Vector(0, 0),
        new Vector(rectangle.width/2, 0),
        new Vector(rectangle.width, 0),
        new Vector(0, rectangle.height/2),
        new Vector(rectangle.width/2, rectangle.height/2),
        new Vector(rectangle.width, rectangle.height/2),
        new Vector(0, rectangle.height),
        new Vector(rectangle.width/2, rectangle.height),
        new Vector(rectangle.width, rectangle.height)
    ];

    return points[anchor];
}