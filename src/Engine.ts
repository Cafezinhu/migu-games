import { Dict } from "@pixi/utils";
import { Application, Container, IApplicationOptions, Loader, LoaderResource } from "pixi.js";
import { Input } from "./Input";
import { Vector } from "./Vector";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
    onProgress?: (progress: number) => void;
    onLoad?: () => void;
    onComplete?: () => void;
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
    loader: Loader;
    resources: Dict<LoaderResource>;
    onLoad: () => void;
    onProgress: (progress: number) => void;
    
    constructor(options?: EngineOptions){
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onLoad = options.onLoad;
        this.onProgress = options.onProgress;
        
        this.loader.onComplete.add(() => options.onComplete());

        this.loader.onLoad.add(() => {
            if(this.onLoad) this.onLoad();
        });

        this.loader.onProgress.add((loader) => {
            if(this.onProgress) this.onProgress(loader.progress);
        });

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

    addResource(name: string, url: string){
        this.loader.add(name, url);
    }

    loadResources(){
        this.loader.load((l, resources) => {
            this.resources = resources;
        });
    }
}