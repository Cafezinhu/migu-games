/// <reference types="victor" />
import { Engine } from "./Engine";
import { Vector } from "./Vector";
export declare class Input {
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    constructor(engine: Engine);
    static mouseEventToVector(e: MouseEvent): import("victor");
    static touchEventToVector(e: TouchEvent): import("victor");
}
