import { Vector } from "../Vector";
import { CollisionArea } from "./CollisionArea";

export class RectangleCollisionArea extends CollisionArea{
    topLeftCorner: Vector;
    bottomRightCorner: Vector;

    constructor(topLeftCorner: Vector, bottomRightCorner: Vector){
        super();
        this.topLeftCorner = topLeftCorner;
        this.bottomRightCorner = bottomRightCorner;
    }

    isCollidingWithPoint(point: Vector): boolean {
        return point.x <= this.bottomRightCorner.x 
            && point.x >= this.topLeftCorner.x
            && point.y <= this.bottomRightCorner.y
            && point.y >= this.topLeftCorner.y;
    }
}