import { Application, Container, IApplicationOptions, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { GameObject } from "./gameObject/GameObject";
import { Input } from "./input/Input";
import { Resources } from "./loadSprites";
import { Vector } from "./Vector";
import { EventQueue, World } from '@dimforge/rapier2d-compat';
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
    physicsStep?: number;
    gravity?: Vector;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
}
export declare class Engine {
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
    physicsWorld: World;
    private physicsInterval;
    physicsEventQueue: EventQueue;
    gameObjects: GameObject[];
    static instance: Engine;
    constructor(options?: EngineOptions);
    static create(options: EngineOptions): Engine;
    update(delta: number): void;
    appendToDocument(): void;
    addResource(name: string, url: string): void;
    addGameObject(gameObject: GameObject): void;
    removeGameObject(gameObject: GameObject): void;
    loadResources(): void;
    onPhysicsUpdate(): void;
    onCollision(handle1: number, handle2: number, started: boolean): void;
}
