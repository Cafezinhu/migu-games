import { Collider } from "@dimforge/rapier2d-compat";
import { ColliderData } from "../physics/Physics";
import { Vector } from "../Vector";
import { GameObject, GameObjectOptions } from "./GameObject";
import { RigidBody } from "./RigidBody";

export type AreaOptions = GameObjectOptions & {
    colliderData: ColliderData;
}

export class Area extends GameObject {
    collider: Collider;
    colliderData: ColliderData;

    constructor(options: AreaOptions) {
        super(options);

        this.collider = this.engine.physicsWorld.createCollider(options.colliderData.collider);
        this.collider.setSensor(true);
    }

    set position(position: Vector) {
        super.position = position;
        this.collider.setTranslation({x: position.x, y: position.y});
    }

    set x(value: number){
        super.x = value;
        this.collider.setTranslation({x: value, y: this.y});
    }

    get x() {
        return super.x;
    }

    set y(value: number){
        super.y = value;
        this.collider.setTranslation({x: this.x, y: value});
    }

    get y() {
        return super.y;
    }

    set rotation(rotation: number){
        super.rotation = rotation;
        this.collider.setRotation(rotation);
    }

    get rotation(){
        return super.rotation;
    }

    get angle(){
        return super.angle;
    }

    set angle(angle: number){
        super.angle = angle;
        this.collider.setRotation(angle/(Math.PI/180));
    }

    //TODO: scale

    set scale(_: any){
        console.warn("Scaling areas is not supported.");
    }

    set visible(value: boolean){
        this.container.visible = value;
        //TODO: set collider visibility on children
    }

    get visible(){
        return super.visible;
    }

    onCollision(gameObject: RigidBody | null, contacts: Vector[], started: boolean){}

    destroy(){
        super.destroy();
        this.engine.physicsWorld.removeCollider(this.collider, true);
        //TODO: destroy rigidbody on children
    }
}