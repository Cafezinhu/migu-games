import { Application, Container, IApplicationOptions } from "pixi.js";
import { Vector } from "./Vector";
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
}
export declare class Engine {
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    sideToPreserve: 'height' | 'width';
    constructor(options?: EngineOptions);
    appendToDocument(): void;
    resize(): void;
}
