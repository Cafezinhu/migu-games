import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { Vector } from "../Vector";
export declare type GameObjectOptions = {
    anchor?: Vector;
    parent?: GameObject;
    ignoreEmptyContainer?: boolean;
};
export declare class GameObject {
    container: Container;
    engine: Engine;
    parent: GameObject;
    children: GameObject[];
    private updateFunction;
    constructor(engine: Engine, options: GameObjectOptions);
    addChild(child: GameObject): void;
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
    lookAt(point: Vector): void;
    destroy(): void;
}
