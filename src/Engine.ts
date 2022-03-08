import { Application, Container, IApplicationOptions } from "pixi.js";
import { Vector } from "./Vector";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
}

export class Engine{
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    sideToPreserve: 'height' | 'width';
    
    constructor(options?: EngineOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;

        this.baseResolution = options.baseResolution;

        if(options.sideToPreserve){
            this.sideToPreserve  = options.sideToPreserve;
        }else{
            this.sideToPreserve = 'width';
        }
    }

    appendToDocument(){
        document.body.appendChild(this.view);

        if(this.autoResize){
            window.addEventListener('resize', () => {
                this.resize();
            });
            this.resize();
        }
    }

    resize(){
        this.pixiApplication.view.height = this.view.parentElement.clientHeight;
        this.pixiApplication.view.width = this.view.parentElement.clientWidth;
        if(this.baseResolution){
            let ratio: number;
            if(this.sideToPreserve == 'height')
                ratio = this.pixiApplication.view.height / this.baseResolution.y;
            else
                ratio = this.pixiApplication.view.width / this.baseResolution.x;

            this.stage.scale.x = ratio;
            this.stage.scale.y = ratio;
        }
        this.pixiApplication.resize();
    }
}