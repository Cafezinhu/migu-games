import { Container } from "pixi.js";
import { Vector } from "../Vector";
export class GameObject {
    constructor(engine, options) {
        this.children = [];
        this.engine = engine;
        if (!options.ignoreEmptyContainer) {
            this.container = new Container();
            this.endOptionsConfiguration(options);
        }
        //@ts-ignore
        if (this.update) {
            this.updateFunction = (delta) => {
                //@ts-ignore
                this.update(delta);
            };
            this.engine.pixiApplication.ticker.add(this.updateFunction);
        }
        //@ts-ignore
        if (this.start)
            this.start();
    }
    addChild(child) {
        this.children.push(child);
        this.container.addChild(child.container);
        child.parent = this;
    }
    endOptionsConfiguration(options) {
        if (options.parent)
            options.parent.addChild(this);
        else
            this.engine.stage.addChild(this.container);
        if (options.anchor) {
            //@ts-ignore
            if (this.container.anchor) {
                //@ts-ignore
                this.container.anchor.set(options.anchor.x, options.anchor.y);
            }
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
    set scaleX(x) {
        this.container.scale.x = x;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleY(y) {
        this.container.scale.y = y;
    }
    get scaleY() {
        return this.container.scale.y;
    }
    set visible(value) {
        this.container.visible = value;
    }
    get visible() {
        return this.container.visible;
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
