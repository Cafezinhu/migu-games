import { Vector } from "../Vector";
import { CollisionArea } from "./CollisionArea";
export declare class CapsuleCollisionArea extends CollisionArea {
    center: Vector;
    height: number;
    radius: number;
    private topCircle;
    private bottomCircle;
    private bodyRectangle;
    constructor(center: Vector, radius: number, height: number);
    isCollidingWithPoint(point: Vector): boolean;
}
