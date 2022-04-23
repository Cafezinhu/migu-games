import { Engine } from "./Engine";
import { Vector } from "./Vector";
export declare class Input {
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    constructor(engine: Engine);
    static mouseEventToVector(e: MouseEvent): Vector;
    static touchEventToVector(e: TouchEvent): Vector;
}
