import { Vector } from "../Vector";
import { CollisionArea } from "./CollisionArea";
export declare class CircleCollisionArea extends CollisionArea {
    center: Vector;
    radius: number;
    constructor(center: Vector, radius: number);
    isCollidingWithPoint(point: Vector): boolean;
}
