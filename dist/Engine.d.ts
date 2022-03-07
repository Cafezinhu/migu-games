import { Application, Container, IApplicationOptions } from "pixi.js";
export declare class Engine {
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    constructor(options?: IApplicationOptions);
}
