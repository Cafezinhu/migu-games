import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { Vector } from "../Vector";
export class GameObject {
    constructor(options) {
        this.children = [];
        this.engine = options.engine ? options.engine : Engine.instance;
        this.engine.addGameObject(this);
        if (!options.ignoreEmptyContainer) {
            this.container = new Container();
            this.endOptionsConfiguration(options);
        }
        //@ts-ignore
        if (this.start) {
            if (options && options.ignoreStart)
                return;
            //@ts-ignore
            this.start();
        }
    }
    addChild(child) {
        this.children.push(child);
        this.container.addChild(child.container);
        if (child._gameObjectParent) {
            child._gameObjectParent.removeChild(child, false);
        }
        child._gameObjectParent = this;
    }
    removeChild(child, addToCamera = true) {
        this.children = this.children.filter(c => {
            return c != child;
        });
        child._gameObjectParent = null;
        if (child.container && addToCamera)
            this.engine.camera.addChild(child.container);
    }
    set parent(p) {
        if (this._gameObjectParent) {
            this._gameObjectParent.removeChild(this, false);
        }
        this._gameObjectParent = p;
        if (p == null) {
            this.engine.camera.addChild(this.container);
        }
        else {
            p.children.push(this);
            p.container.addChild(this.container);
        }
    }
    get parent() {
        return this._gameObjectParent;
    }
    endOptionsConfiguration(options) {
        if (options.parent)
            options.parent.addChild(this);
        else
            this.engine.camera.addChild(this.container);
        if (options.anchor) {
            //@ts-ignore
            if (this.container.anchor) {
                //@ts-ignore
                this.container.anchor.set(options.anchor.x, options.anchor.y);
            }
        }
        if (options.zIndex)
            this.container.zIndex = options.zIndex;
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
    set zIndex(z) {
        this.container.zIndex = z;
    }
    get zIndex() {
        return this.container.zIndex;
    }
    lookAt(point) {
        this.angle = point.clone().subtract(this.position).angleDeg();
    }
    destroy() {
        this.children.forEach(child => child.destroy());
        this.engine.removeGameObject(this);
        if (this._updateFunction)
            this.engine.pixiApplication.ticker.remove(this._updateFunction);
        this.container.destroy();
    }
}
