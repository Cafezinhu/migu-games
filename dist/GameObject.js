import { Sprite } from "pixi.js";
import { Vector } from "./Vector";
export class GameObject {
    constructor(options) {
        this.sprite = Sprite.from(options.spriteUrl);
        this.engine = options.engine;
        this.engine.stage.addChild(this.sprite);
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
    set rotation(rotation) {
        this.sprite.rotation = rotation;
    }
    get rotation() {
        return this.sprite.rotation;
    }
    destroy() {
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.sprite.destroy();
    }
}
