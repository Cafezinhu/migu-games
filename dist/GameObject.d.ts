import { Sprite } from "pixi.js";
import { Engine } from "./Engine";
import { Vector } from "./Vector";
export declare type GameObjectOptions = {
    spriteUrl?: string;
    anchor?: Vector;
};
export declare class GameObject {
    sprite: Sprite;
    engine: Engine;
    private updateFunction;
    constructor(engine: Engine, options?: GameObjectOptions);
    set position(position: Vector);
    get position(): Vector;
    set rotation(rotation: number);
    get rotation(): number;
    set scale(scale: Vector);
    get scale(): Vector;
    destroy(): void;
}
