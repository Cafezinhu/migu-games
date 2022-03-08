import { Sprite } from "pixi.js";
import { getAnchorPoint } from "./Anchor";
import { Vector } from "./Vector";
export class GameObject {
    constructor(engine, options) {
        this.sprite = Sprite.from(options.spriteUrl);
        this.engine = engine;
        this.engine.stage.addChild(this.sprite);
        if (options.anchor) {
            const anchorPoint = getAnchorPoint(this.sprite.getBounds(), options.anchor);
            this.sprite.anchor.set(anchorPoint.x, anchorPoint.y);
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
