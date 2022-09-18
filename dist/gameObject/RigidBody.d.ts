import { Collider, RigidBody as RapierRigidBody } from "@dimforge/rapier2d-compat";
import { ColliderData } from "../physics/Physics";
import { Vector } from "../Vector";
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type RigidBodyOptions = GameObjectOptions & {
    colliderData?: ColliderData;
    rigidBodyType?: 'fixed' | 'dynamic';
    mass: number;
};
export declare class RigidBody extends GameObject {
    rigidBody: RapierRigidBody;
    collider?: Collider;
    colliderData?: ColliderData;
    constructor(options: RigidBodyOptions);
    setCollider(colliderData: ColliderData): void;
    set position(position: Vector);
    set x(value: number);
    set y(value: number);
    set rotation(rotation: number);
    set angle(angle: number);
    set visible(value: boolean);
    onCollision(gameObject: GameObject | null, contacts: Vector[], started: boolean): void;
    destroy(): void;
}
