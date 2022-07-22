import { Application, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { Input } from "./Input";
import { Vector } from "./Vector";
export class Engine {
    constructor(options) {
        this.pixiApplication = new Application(Object.assign(Object.assign({}, options), { resizeTo: window }));
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onLoad = options.onLoad;
        this.onProgress = options.onProgress;
        this.onComplete = options.onComplete;
        this.loader.onLoad.add(() => {
            if (this.onLoad)
                this.onLoad();
        });
        this.loader.onProgress.add((loader) => {
            if (this.onProgress)
                this.onProgress(loader.progress);
        });
        this.baseResolution = options.baseResolution ? options.baseResolution : new Vector(window.innerWidth, window.innerHeight);
        this.camera = new Camera({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: this.baseResolution.x,
            worldHeight: this.baseResolution.y,
            interaction: this.pixiApplication.renderer.plugins.interaction
        });
        this.camera.moveCenter(0, 0);
        this.stage.addChild(this.camera);
        this.scaleRatio = 1;
        if (options.sideToPreserve) {
            this.sideToPreserve = options.sideToPreserve;
        }
        else {
            this.sideToPreserve = 'width';
        }
        if (!options.disableInputSystem) {
            this.inputSystem = new Input(this);
        }
        window.addEventListener('resize', () => {
            this.pixiApplication.resize();
            this.camera.setZoom(this.sideToPreserve == 'width' ?
                window.innerWidth / this.baseResolution.x :
                window.innerHeight / this.baseResolution.y, true);
        });
    }
    ;
    appendToDocument() {
        document.body.appendChild(this.view);
    }
    resize() {
        this.pixiApplication.view.height = this.view.parentElement.clientHeight;
        this.pixiApplication.view.width = this.view.parentElement.clientWidth;
        if (this.baseResolution) {
            if (this.sideToPreserve == 'height')
                this.scaleRatio = this.pixiApplication.view.height / this.baseResolution.y;
            else
                this.scaleRatio = this.pixiApplication.view.width / this.baseResolution.x;
            this.stage.scale.x = this.scaleRatio;
            this.stage.scale.y = this.scaleRatio;
        }
        this.pixiApplication.resize();
    }
    addResource(name, url) {
        this.loader.add(name, url);
    }
    loadResources() {
        this.loader.load((l, resources) => {
            this.resources = resources;
            if (this.onComplete)
                this.onComplete();
        });
    }
}
