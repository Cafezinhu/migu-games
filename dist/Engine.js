import { Application } from "pixi.js";
export class Engine {
    constructor(options) {
        this.pixiApplication = new Application(options);
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
    }
    appendToDocument(element) {
        if (!element)
            element = document.body;
        element.appendChild(this.view);
    }
}
