import { Application } from "pixi.js";
export class Engine {
    constructor(options) {
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
    }
    appendToDocument(element) {
        if (!element)
            element = document.body;
        element.appendChild(this.view);
        if (this.autoResize) {
            element.parentElement.addEventListener('resize', () => {
                this.resize();
            });
        }
    }
    resize() {
        this.pixiApplication.view.height = this.view.parentElement.clientHeight;
        this.pixiApplication.view.width = this.view.parentElement.clientWidth;
        this.pixiApplication.resize();
    }
}
