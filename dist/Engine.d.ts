import { Dict } from "@pixi/utils";
import { Application, Container, IApplicationOptions, Loader, LoaderResource } from "pixi.js";
import { Input } from "./Input";
import { Vector } from "./Vector";
export interface EngineOptions extends IApplicationOptions {
    autoResize?: boolean;
    sideToPreserve?: 'height' | 'width';
    baseResolution?: Vector;
    disableInputSystem?: boolean;
    onProgress?: (progress: number) => void;
    onLoad?: () => void;
}
export declare class Engine {
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
    constructor(options?: EngineOptions);
    appendToDocument(): void;
    resize(): void;
    addResource(name: string, url: string): void;
    loadResources(): void;
}
