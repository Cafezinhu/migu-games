import { Application, Container, IApplicationOptions } from "pixi.js";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
}

export class Engine{
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    
    constructor(options?: EngineOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
    }

    appendToDocument(element?: HTMLElement){
        if(!element)
            element = document.body;

        element.appendChild(this.view);
    }
}