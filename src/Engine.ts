import { Application, Container, IApplicationOptions } from "pixi.js";

export class Engine{
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    
    constructor(options?: IApplicationOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
    }
}