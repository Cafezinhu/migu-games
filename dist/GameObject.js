import { Sprite } from "pixi.js";
import { Vector } from "./Vector";
export class GameObject {
    constructor(engine, options) {
        this.sprite = Sprite.from(options.spriteUrl);
        this.engine = engine;
        this.engine.stage.addChild(this.sprite);
        if (options.anchor) {
            this.sprite.anchor.set(options.anchor.x, options.anchor.y);
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
        this.sprite.position.x = position.x;
        this.sprite.position.y = position.y;
    }
    get position() {
        const position = this.sprite.position;
        return new Vector(position.x, position.y);
    }
    set x(value) {
        this.sprite.position.x = value;
    }
    get x() {
        return this.sprite.position.x;
    }
    set y(value) {
        this.sprite.position.y = value;
    }
    get y() {
        return this.sprite.position.y;
    }
    set rotation(rotation) {
        this.sprite.rotation = rotation;
    }
    get rotation() {
        return this.sprite.rotation;
    }
    set scale(scale) {
        this.sprite.scale.x = scale.x;
        this.sprite.scale.y = scale.y;
    }
    get scale() {
        return new Vector(this.sprite.scale.x, this.sprite.scale.y);
    }
    destroy() {
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.sprite.destroy();
    }
}
