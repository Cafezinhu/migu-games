import { Engine } from "../Engine";
import { Vector } from "../Vector";
import { InputKey } from "./InputKey";
export declare class Input {
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    static keys: Map<string, InputKey>;
    constructor(engine: Engine);
    static mouseEventToVector(e: MouseEvent): Vector;
    static touchEventToVector(e: TouchEvent): Vector;
    static isKeyPressed(key: string): boolean;
    static pressedOnThisFrame(key: string): boolean;
    static releasedOnThisFrame(key: string): boolean;
    static pressKey(key: string): void;
    static releaseKey(key: string): void;
    static getKey(key: string): InputKey;
    static createKey(key: string): InputKey;
}
