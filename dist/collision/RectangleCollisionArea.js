import { CollisionArea } from "./CollisionArea";
export class RectangleCollisionArea extends CollisionArea {
    constructor(topLeftCorner, bottomRightCorner) {
        super();
        this.topLeftCorner = topLeftCorner;
        this.bottomRightCorner = bottomRightCorner;
    }
    isCollidingWithPoint(point) {
        return point.x <= this.bottomRightCorner.x
            && point.x >= this.topLeftCorner.x
            && point.y <= this.bottomRightCorner.y
            && point.y >= this.topLeftCorner.y;
    }
}
