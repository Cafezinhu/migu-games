import { Application, Container, IApplicationOptions } from "pixi.js";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
}

export class Engine{
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    
    constructor(options?: EngineOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
    }

    appendToDocument(){
        document.body.appendChild(this.view);

        if(this.autoResize){
            window.addEventListener('resize', () => {
                this.resize();
            });
        }
    }

    resize(){
        this.pixiApplication.view.height = this.view.parentElement.clientHeight;
        this.pixiApplication.view.width = this.view.parentElement.clientWidth;
        this.pixiApplication.resize();
    }
}