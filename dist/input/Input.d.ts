import { Engine } from "../Engine";
import { Vector } from "../Vector";
import { InputKey } from "./InputKey";
export declare class Input {
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    static keys: Map<string, InputKey>;
    static maps: Map<string, string[]>;
    static axes: Map<string, (string[] | number)[]>;
    static vectors: Map<string, (string[] | string)>;
    constructor(engine: Engine);
    static mouseEventToVector(e: MouseEvent): Vector;
    static touchEventToVector(e: TouchEvent): Vector;
    static isKeyPressed(key: string): boolean;
    static pressedOnThisFrame(key: string): boolean;
    static releasedOnThisFrame(key: string): boolean;
    static axisFromKeys(negative: string, positive: string): number;
    static vectorFromKeys(left: string, right: string, up: string, down: string): Vector;
    static valueFromKey(key: string): number;
    static pressKey(key: string, value?: number): void;
    static releaseKey(key: string): void;
    static getKey(key: string): InputKey;
    static createKey(key: string): InputKey;
    static mapKeys(name: string, keys: string[]): void;
    static mapAxis(name: string, axes: (string[] | number)[]): void;
    static getAxis(name: string): number;
    static updateGamepad(): void;
}
