import { Container } from "pixi.js";
import { Engine } from "../Engine";
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
    private _gameObjectParent;
    children: GameObject[];
    protected _updateFunction: any;
    tag?: string;
    destroyed: boolean;
    constructor(options: GameObjectOptions);
    addChild(child: GameObject): void;
    removeChild(child: GameObject, addToCamera?: boolean): void;
    set parent(p: GameObject);
    get parent(): GameObject;
    protected endOptionsConfiguration(options: GameObjectOptions): void;
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
    set visible(value: boolean);
    get visible(): boolean;
    set zIndex(z: number);
    get zIndex(): number;
    lookAt(point: Vector): void;
    destroy(): void;
}
