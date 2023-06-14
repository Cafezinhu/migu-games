import { Collider } from "@dimforge/rapier2d-compat";
import { ColliderData } from "../physics/Physics";
import { Vector } from "../Vector";
import { GameObject, GameObjectOptions } from "./GameObject";
import { RigidBody } from "./RigidBody";
export declare type AreaOptions = GameObjectOptions & {
    colliderData: ColliderData;
};
export declare class Area extends GameObject {
    collider: Collider;
    colliderData: ColliderData;
    constructor(options: AreaOptions);
    set position(position: Vector);
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set rotation(rotation: number);
    get rotation(): number;
    get angle(): number;
    set angle(angle: number);
    set scale(_: any);
    set visible(value: boolean);
    get visible(): boolean;
    onCollision(gameObject: RigidBody | null, contacts: Vector[], started: boolean): void;
    destroy(): void;
}
