import { Application, Container, IApplicationOptions } from "pixi.js";
import { Input } from "./Input";
import { Vector } from "./Vector";
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
}
export declare class Engine {
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    sideToPreserve: 'height' | 'width';
    scaleRatio: number;
    inputSystem: Input;
    constructor(options?: EngineOptions);
    appendToDocument(): void;
    resize(): void;
}
