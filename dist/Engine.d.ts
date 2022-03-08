import { Application, Container, IApplicationOptions } from "pixi.js";
import { Vector } from "./Vector";
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
    baseResolution?: Vector;
}
export declare class Engine {
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    constructor(options?: EngineOptions);
    appendToDocument(): void;
    resize(): void;
}
