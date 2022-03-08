import { Vector } from "./Vector";

export class Anchor{
    static TopLeft = new Vector(0, 0);
    static Top = new Vector(0.5, 0);
    static TopRight = new Vector(1, 0);
    static Left = new Vector(0, 0.5);
    static Center = new Vector(0.5, 0.5);
    static Right = new Vector(1, 0.5);
    static BottomLeft = new Vector(0, 1);
    static Bottom = new Vector(0.5, 1);
    static BottomRight = new Vector(1, 1);
}