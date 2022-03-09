import { Container } from "pixi.js";
import { Engine } from "./Engine";
import { Vector } from "./Vector";
export declare type GameObjectOptions = {
    spriteUrl?: string | string[];
    anchor?: Vector;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
};
export declare class GameObject {
    container: Container;
    engine: Engine;
    private updateFunction;
    constructor(engine: Engine, options?: GameObjectOptions);
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
    set animationSpeed(speed: number);
    get animationSpeed(): number;
    destroy(): void;
}
