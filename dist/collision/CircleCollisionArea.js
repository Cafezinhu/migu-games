import { CollisionArea } from "./CollisionArea";
export class CircleCollisionArea extends CollisionArea {
    constructor(center, radius) {
        super();
        this.center = center;
        this.radius = radius;
    }
    isCollidingWithPoint(point) {
        return point.distance(this.center) <= this.radius;
    }
}
