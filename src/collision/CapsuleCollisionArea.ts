import { Vector } from "../Vector";
import { CircleCollisionArea } from "./CircleCollisionArea";
import { CollisionArea } from "./CollisionArea";
import { RectangleCollisionArea } from "./RectangleCollisionArea";

export class CapsuleCollisionArea extends CollisionArea{
    center: Vector;
    height: number;
    radius: number;

    private topCircle: CircleCollisionArea;
    private bottomCircle: CircleCollisionArea;
    private bodyRectangle: RectangleCollisionArea;

    constructor(center: Vector, radius: number, height: number){
        super();
        this.center = center;
        this.radius = radius;
        this.height = height;

        const topCenter = new Vector(center.x, center.y - height/2 + radius);
        const bottomCenter = new Vector(center.x, center.y + height/2 - radius);

        this.topCircle = new CircleCollisionArea(topCenter, radius);
        this.bottomCircle = new CircleCollisionArea(bottomCenter, radius);
        this.bodyRectangle = new RectangleCollisionArea(
            new Vector(topCenter.x - radius, topCenter.y), 
            new Vector(bottomCenter.x + radius, bottomCenter.y)
        );
    }

    isCollidingWithPoint(point: Vector){
        return this.topCircle.isCollidingWithPoint(point)
            || this.bottomCircle.isCollidingWithPoint(point)
            || this.bodyRectangle.isCollidingWithPoint(point);
    }
}