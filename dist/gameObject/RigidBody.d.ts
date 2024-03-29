import { Collider, RigidBody as RapierRigidBody } from "@dimforge/rapier2d-compat";
import { ColliderData } from "../physics/Physics";
import { Vector } from "../Vector";
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type RigidBodyOptions = GameObjectOptions & {
    colliderData?: ColliderData;
    rigidBodyType?: 'fixed' | 'dynamic';
    mass?: number;
};
export declare class RigidBody extends GameObject {
    rigidBody: RapierRigidBody;
    collider?: Collider;
    colliderData?: ColliderData;
    constructor(options: RigidBodyOptions);
    setCollider(colliderData: ColliderData): void;
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
    set velocity(v: Vector);
    get velocity(): Vector;
    set velocityX(x: number);
    set velocityY(y: number);
    get velocityX(): number;
    get velocityY(): number;
    onCollision(gameObject: RigidBody | null, contacts: Vector[], started: boolean): void;
    destroy(): void;
}
