import Matter from "matter-js";
import { Application, Container, IApplicationOptions, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { GameObject } from "./gameObject/GameObject";
import { Input } from "./Input";
import { Resources } from "./loadSprites";
import { Vector } from "./Vector";
import {EventQueue, World} from '@dimforge/rapier2d-compat';
import { Physics } from "./Physics";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
    physicsStep?: number;
    gravity?: Vector;
    onProgress?: (progress: number) => void;
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
    physicsWorld: World;
    private physicsInterval: any;
    physicsEventQueue: EventQueue;

    gameObjects: GameObject[];

    constructor(options?: EngineOptions){
        this.pixiApplication = new Application({...options, resizeTo: window});
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onProgress = options.onProgress;

        this.gameObjects = [];

        this.loader.onComplete.add(async () => {
            await Physics.init();
            let gravity = options.gravity ? new Physics.Vector2(options.gravity.x, -options.gravity.y) : new Physics.Vector2(0, -9.81);
            
            this.physicsWorld = new Physics.World(gravity);

            this.physicsEventQueue = new Physics.EventQueue(true);

            this.physicsEventQueue.drainCollisionEvents((handle1, handle2, started) => {
                this.onCollision(handle1, handle2, started);
            });

            clearInterval(this.physicsInterval);

            this.physicsInterval = setInterval(() => {
                this.onPhysicsUpdate();
            });

            if(options.onComplete) options.onComplete();
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
        this.physicsWorld.step();
        this.gameObjects.forEach(gameObject => {
            if(!gameObject.rigidBody) return;

            const pos = gameObject.rigidBody.translation();
            gameObject.position = new Vector(pos.x, -pos.y);
            gameObject.rotation = gameObject.rigidBody.rotation();
        })
    }

    onCollision(handle1: number, handle2: number, started: boolean){
        let gameObjectA: GameObject = null;
        for(let gameObject of this.gameObjects){
            if(handle1 == gameObject.collider.handle){
                gameObjectA = gameObject;
                break;
            }
        }
        let gameObjectB: GameObject = null;
        for(let gameObject of this.gameObjects){
            if(handle2 == gameObject.collider.handle){
                gameObjectB = gameObject;
                break;
            }
        }

        const pair = gameObjectA.collider.contactCollider(gameObjectB.collider, 1);
        const contacts = [
            new Vector(pair.point1.x, -pair.point1.y),
            new Vector(pair.point2.x, -pair.point2.y)
        ]

        gameObjectA.onCollision(gameObjectB, contacts, started);
        gameObjectB.onCollision(gameObjectA, contacts, started);
    }
}