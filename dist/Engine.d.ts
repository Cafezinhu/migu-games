import { Application, Container, IApplicationOptions, ICanvas } from "pixi.js";
import { Camera } from "./Camera";
import { GameObject } from "./gameObject/GameObject";
import { Input } from "./input/Input";
import { Resources } from "./loadSprites";
import { Vector } from "./Vector";
import { EventQueue, World } from '@dimforge/rapier2d-compat';
export interface EngineOptions extends IApplicationOptions {
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
export declare class Engine {
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
    private physicsInterval;
    physicsEventQueue: EventQueue;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
    gameObjects: GameObject[];
    static instance: Engine;
    constructor(options?: EngineOptions);
    static create(options: EngineOptions): Engine;
    startPhysics(options: EngineOptions): Promise<void>;
    update(delta: number): void;
    appendToDocument(): void;
    addGameObject(gameObject: GameObject): void;
    removeGameObject(gameObject: GameObject): void;
    loadResources(): Promise<void>;
    onPhysicsUpdate(): void;
    onCollision(handle1: number, handle2: number, started: boolean): void;
}
