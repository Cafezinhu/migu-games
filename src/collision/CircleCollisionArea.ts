import { Vector } from "../Vector";
import { CollisionArea } from "./CollisionArea";

export class CircleCollisionArea extends CollisionArea{
    center: Vector;
    radius: number;

    constructor(center: Vector, radius: number){
        super();
        this.center = center;
        this.radius = radius;
    }

    isCollidingWithPoint(point: Vector){
        return point.distance(this.center) <= this.radius;
    }
}