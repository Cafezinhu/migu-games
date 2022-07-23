import { Vector } from "../Vector";
import { CollisionArea } from "./CollisionArea";
export declare class RectangleCollisionArea extends CollisionArea {
    topLeftCorner: Vector;
    bottomRightCorner: Vector;
    constructor(topLeftCorner: Vector, bottomRightCorner: Vector);
    isCollidingWithPoint(point: Vector): boolean;
}
