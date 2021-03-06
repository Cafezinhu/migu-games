import { Collider, RigidBody } from "@dimforge/rapier2d-compat";
import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { ColliderData } from "../Physics";
import { Vector } from "../Vector";
export declare type GameObjectOptions = {
    anchor?: Vector;
    parent?: GameObject;
    ignoreEmptyContainer?: boolean;
    ignoreStart?: boolean;
    zIndex?: number;
    tag?: string;
    engine?: Engine;
};
export declare class GameObject {
    container: Container;
    engine: Engine;
    parent: GameObject;
    children: GameObject[];
    private updateFunction;
    tag?: string;
    rigidBody?: RigidBody;
    collider?: Collider;
    colliderData?: ColliderData;
    constructor(options: GameObjectOptions);
    addChild(child: GameObject): void;
    protected endOptionsConfiguration(options: GameObjectOptions): void;
    setCollider(colliderData: ColliderData): void;
    setRigidbody(type: 'fixed' | 'dynamic', mass?: number): void;
    set position(position: Vector);
    get position(): Vector;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set rotation(rotation: number);
    get rotation(): number;
    set angle(angle: number);
    get angle(): number;
    set scale(scale: Vector);
    get scale(): Vector;
    set scaleX(x: number);
    get scaleX(): number;
    set scaleY(y: number);
    get scaleY(): number;
    scaleCollider(): void;
    set visible(value: boolean);
    get visible(): boolean;
    set zIndex(z: number);
    get zIndex(): number;
    lookAt(point: Vector): void;
    onCollision(gameObject: GameObject | null, contacts: Vector[], started: boolean): void;
    destroy(): void;
}
