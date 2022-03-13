import { AnimatedSprite, Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { Vector } from "./Vector";
export class GameObject {
    constructor(engine, options) {
        if (options && options.spriteUrl) {
            if (typeof (options.spriteUrl) == 'string') {
                if (options.tilingSize) {
                    this.container = TilingSprite.from(options.spriteUrl, {
                        width: options.tilingSize.x,
                        height: options.tilingSize.y
                    });
                }
                else {
                    this.container = Sprite.from(options.spriteUrl);
                }
            }
            else {
                const textures = options.spriteUrl.map(url => {
                    return Texture.from(url);
                });
                this.container = new AnimatedSprite(textures);
                const container = this.container;
                container.loop = options.loop;
                if (options.animationSpeed)
                    container.animationSpeed = options.animationSpeed;
                if (options.autoPlay)
                    container.play();
            }
        }
        else
            this.container = new Container();
        this.engine = engine;
        if (options.parent)
            options.parent.addChild(this.container);
        else
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
    set angle(angle) {
        this.container.angle = angle;
    }
    get angle() {
        return this.container.angle;
    }
    set scale(scale) {
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
    }
    get scale() {
        return new Vector(this.container.scale.x, this.container.scale.y);
    }
    set animationSpeed(speed) {
        this.container.animationSpeed = speed;
    }
    get animationSpeed() {
        return this.container.animationSpeed;
    }
    set offset(offset) {
        this.container
            .tilePosition.set(offset.x, offset.y);
    }
    get offset() {
        const tilePosition = this.container.tilePosition;
        return new Vector(tilePosition.x, tilePosition.y);
    }
    lookAt(point) {
        this.angle = point.clone().subtract(this.position).angleDeg();
    }
    destroy() {
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
    }
}
