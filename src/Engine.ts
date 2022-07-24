import Matter from "matter-js";
import { Application, Container, IApplicationOptions, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { GameObject } from "./gameObject/GameObject";
import { Input } from "./Input";
import { Resources } from "./loadSprites";
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
    inputSystem: Input;
    loader: Loader;
    resources: Resources;
    camera: Camera;
    onLoad: () => void;
    onProgress: (progress: number) => void;
    onComplete: () => void;

    physicsEngine: Matter.Engine;

    gameObjects: GameObject[];

    constructor(options?: EngineOptions){
        this.pixiApplication = new Application({...options, resizeTo: window});
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onLoad = options.onLoad;
        this.onProgress = options.onProgress;

        this.onComplete = options.onComplete;

        this.gameObjects = [];

        this.loader.onLoad.add(() => {
            if(this.onLoad) this.onLoad();
        });

        this.loader.onProgress.add((loader) => {
            if(this.onProgress) this.onProgress(loader.progress);
        });

        this.baseResolution = options.baseResolution ? options.baseResolution : new Vector(window.innerWidth, window.innerHeight);

        this.camera = new Camera({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: this.baseResolution.x,
            worldHeight: this.baseResolution.y,
            interaction: this.pixiApplication.renderer.plugins.interaction
        });

        this.camera.moveCenter(0,0);

        this.stage.addChild(this.camera);

        if(options.sideToPreserve){
            this.sideToPreserve  = options.sideToPreserve;
        }else{
            this.sideToPreserve = 'width';
        }

        if(!options.disableInputSystem) {
            this.inputSystem = new Input(this);
        }

        window.addEventListener('resize', () => {
            const cameraPos = this.camera.center;
            this.pixiApplication.resize();
            this.camera.setZoom(
                this.sideToPreserve == 'width' ?
                    window.innerWidth/this.baseResolution.x : 
                    window.innerHeight/this.baseResolution.y,
                true
            );
            this.camera.resize();
            this.camera.moveCenter(cameraPos.x, cameraPos.y);
        });

        this.physicsEngine = new Matter.Engine();
        const physicsRunner = Matter.Runner.create();
        Matter.Events.on(this.physicsEngine, 'afterUpdate', () => this.onPhysicsUpdate());
        Matter.Runner.run(physicsRunner, this.physicsEngine);
    }

    appendToDocument(){
        document.body.appendChild(this.view);
    }

    addResource(name: string, url: string){
        this.loader.add(name, url);
    }

    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject){
        this.gameObjects = this.gameObjects.filter(g => {
            return g != gameObject;
        });
    }

    loadResources(){
        this.loader.load((l, resources) => {
            this.resources = resources;
            if(this.onComplete) this.onComplete();
        });
    }

    onPhysicsUpdate(){
        this.gameObjects.forEach(gameObject => {
            const physicsBody = gameObject.physicsBody
            if(!physicsBody) return;

            gameObject.x = physicsBody.position.x;
            gameObject.y = physicsBody.position.y;

            gameObject.angle = physicsBody.angle;
        })
    }
}