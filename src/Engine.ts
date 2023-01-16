import { Application, Assets, Container, IApplicationOptions, ICanvas } from "pixi.js";
import { Camera } from "./Camera";
import { GameObject } from "./gameObject/GameObject";
import { Input } from "./input/Input";
import { manifest, Resources } from "./loadSprites";
import { Vector } from "./Vector";
import {EventQueue, World} from '@dimforge/rapier2d-compat';
import { PhysicsPlugin } from "./physics/Physics";
import { RigidBody } from "./gameObject/RigidBody";

export interface EngineOptions extends IApplicationOptions{
    autoResize?: boolean;
    resizeTo?: HTMLElement | Window;
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
    view: ICanvas;
    stage: Container;
    autoResize: boolean;
    baseResolution: Vector;
    sideToPreserve: 'height' | 'width';
    inputSystem: Input;
    resources: Resources;
    camera: Camera;

    physicsWorld: World;
    private physicsInterval: any;
    physicsEventQueue: EventQueue;

    onProgress?: (progress: number) => void;
    onComplete?: () => void;

    gameObjects: GameObject[];

    static instance: Engine;

    constructor(options?: EngineOptions){
        if (!options.resizeTo) options.resizeTo = window;
        this.onProgress = options.onProgress;
        this.onComplete = options.onComplete;
        this.pixiApplication = new Application({...options});
        this.view = this.pixiApplication.view;
        this.view.addEventListener('contextmenu', e => e.preventDefault());
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;

        this.gameObjects = [];

        this.startPhysics(options);

        this.pixiApplication.ticker.add(delta => this.update(delta));


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

    static create(options: EngineOptions){
        Engine.instance = new Engine(options);
        Engine.instance.appendToDocument();
        return Engine.instance;
    }

    async startPhysics(options: EngineOptions){
        await PhysicsPlugin.init();
        let gravity = options.gravity ? new PhysicsPlugin.Vector2(options.gravity.x, options.gravity.y) : new PhysicsPlugin.Vector2(0, 9.81);
        
        this.physicsWorld = new PhysicsPlugin.World(gravity);

        this.physicsEventQueue = new PhysicsPlugin.EventQueue(true);

        clearInterval(this.physicsInterval);

        this.physicsInterval = setInterval(() => {
            this.onPhysicsUpdate();
        });
    }

    update(delta: number){
        Array.from(Input.keys.values()).forEach(key => {
            key.update();
        });

        this.gameObjects.forEach(gameObject => {
            //@ts-ignore
            if(gameObject.update) gameObject.update(delta);
        })
    }

    appendToDocument(){
        //@ts-ignore
        document.body.appendChild(this.view);
    }

    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject){
        this.gameObjects = this.gameObjects.filter(g => {
            return g != gameObject;
        });
    }

    async loadResources(){
        await Assets.init({manifest});
        const assets = await Assets.loadBundle('assets', progress => {
            this.onProgress(progress);
            if(progress >= 1){
                this.onComplete();
            }
        });
        console.log('LOADED ASSETS:');
        
        console.log(assets);
        
    }

    onPhysicsUpdate(){
        this.physicsWorld.step(this.physicsEventQueue);
        this.physicsEventQueue.drainCollisionEvents((handle1, handle2, started) => {
            this.onCollision(handle1, handle2, started);
        });
        
        this.gameObjects.forEach((gameObject: RigidBody) => {
            if(!gameObject.rigidBody) return;

            const pos = gameObject.rigidBody.translation();
            gameObject.position = new Vector(pos.x, pos.y);
            gameObject.rotation = gameObject.rigidBody.rotation();
        })
    }

    onCollision(handle1: number, handle2: number, started: boolean){
        let gameObjectA: RigidBody = null;
        for(const gameObject of this.gameObjects){
            const rigidBody = gameObject as RigidBody;
            if(!rigidBody.rigidBody) continue;

            if(handle1 == rigidBody.collider.handle){
                gameObjectA = rigidBody;
                break;
            }
        }

        let gameObjectB: RigidBody = null;
        for(const gameObject of this.gameObjects){
            const rigidBody = gameObject as RigidBody;
            if(!rigidBody.rigidBody) continue;

            if(handle2 == rigidBody.collider.handle){
                gameObjectB = rigidBody;
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