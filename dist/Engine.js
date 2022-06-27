import { Application, Loader } from "pixi.js";
import { Input } from "./Input";
export class Engine {
    constructor(options) {
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onLoad = options.onLoad;
        this.onProgress = options.onProgress;
        this.loader.onLoad.add(() => {
            if (this.onLoad)
                this.onLoad();
        });
        this.loader.onProgress.add((loader) => {
            if (this.onProgress)
                this.onProgress(loader.progress);
        });
        this.baseResolution = options.baseResolution;
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
    }
    appendToDocument() {
        document.body.appendChild(this.view);
        if (this.autoResize) {
            window.addEventListener('resize', () => {
                this.resize();
            });
            this.resize();
        }
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
        });
    }
}
