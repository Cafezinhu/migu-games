import { Application, Container, IApplicationOptions } from "pixi.js";
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
}
export declare class Engine {
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    constructor(options?: EngineOptions);
    appendToDocument(element?: HTMLElement): void;
    resize(): void;
}
