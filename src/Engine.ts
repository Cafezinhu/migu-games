import { Application, Container, IApplicationOptions } from "pixi.js";
import { Input } from "./Input";
import { Vector } from "./Vector";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
}

export class Engine{
    pixiApplication: Application;
    view: HTMLCanvasElement;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    sideToPreserve: 'height' | 'width';
    scaleRatio: number;
    inputSystem: Input;
    
    constructor(options?: EngineOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;

        this.baseResolution = options.baseResolution;

        this.scaleRatio = 1;

        if(options.sideToPreserve){
            this.sideToPreserve  = options.sideToPreserve;
        }else{
            this.sideToPreserve = 'width';
        }

        if(!options.disableInputSystem) {
            this.inputSystem = new Input(this);
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
            if(this.sideToPreserve == 'height')
                this.scaleRatio = this.pixiApplication.view.height / this.baseResolution.y;
            else
                this.scaleRatio = this.pixiApplication.view.width / this.baseResolution.x;

            this.stage.scale.x = this.scaleRatio;
            this.stage.scale.y = this.scaleRatio;
        }
        this.pixiApplication.resize();
    }
}