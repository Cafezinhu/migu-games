import { Container, Sprite } from "pixi.js";
import { Vector } from "./Vector";
export class GameObject {
    constructor(engine, options) {
        if (options && options.spriteUrl)
            this.container = Sprite.from(options.spriteUrl);
        else
            this.container = new Container();
        this.engine = engine;
        this.engine.stage.addChild(this.container);
        if (options && options.anchor) {
            //@ts-ignore
            if (this.container.anchor) {
                //@ts-ignore
                this.container.anchor.set(options.anchor.x, options.anchor.y);
            }
        }
        //@ts-ignore
        if (this.update) {
            this.updateFunction = (delta) => {
                //@ts-ignore
                this.update(delta);
            };
            this.engine.pixiApplication.ticker.add(this.updateFunction);
        }
    }
    set position(position) {
        this.container.position.x = position.x;
        this.container.position.y = position.y;
    }
    get position() {
        const position = this.container.position;
        return new Vector(position.x, position.y);
    }
    set x(value) {
        this.container.position.x = value;
    }
    get x() {
        return this.container.position.x;
    }
    set y(value) {
        this.container.position.y = value;
    }
    get y() {
        return this.container.position.y;
    }
    set rotation(rotation) {
        this.container.rotation = rotation;
    }
    get rotation() {
        return this.container.rotation;
    }
    set scale(scale) {
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
    }
    get scale() {
        return new Vector(this.container.scale.x, this.container.scale.y);
    }
    destroy() {
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
    }
}
