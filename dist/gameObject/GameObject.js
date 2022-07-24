import { Body, Composite } from "matter-js";
import { Container } from "pixi.js";
import { Vector } from "../Vector";
export class GameObject {
    constructor(engine, options) {
        this.children = [];
        this.engine = engine;
        engine.addGameObject(this);
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
        child.parent = this;
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
    setPhysics(engine, body) {
        this.physicsBody = body;
        Composite.add(engine.physicsEngine.world, body);
    }
    set position(position) {
        this.container.position.x = position.x;
        this.container.position.y = position.y;
        if (this.physicsBody)
            this.physicsBody.position = { x: position.x, y: position.y };
    }
    get position() {
        const position = this.container.position;
        return new Vector(position.x, position.y);
    }
    set x(value) {
        this.container.position.x = value;
        if (this.physicsBody)
            this.physicsBody.position.x = value;
    }
    get x() {
        return this.container.position.x;
    }
    set y(value) {
        this.container.position.y = value;
        if (this.physicsBody)
            this.physicsBody.position.y = value;
    }
    get y() {
        return this.container.position.y;
    }
    set rotation(rotation) {
        this.container.rotation = rotation;
        if (this.physicsBody)
            this.physicsBody.angle = rotation / (Math.PI / 180);
    }
    get rotation() {
        return this.container.rotation;
    }
    set angle(angle) {
        this.container.angle = angle;
        if (this.physicsBody)
            this.physicsBody.angle = angle;
    }
    get angle() {
        return this.container.angle;
    }
    set scale(scale) {
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
        if (this.physicsBody)
            Body.scale(this.physicsBody, scale.x, scale.y);
    }
    get scale() {
        return new Vector(this.container.scale.x, this.container.scale.y);
    }
    set scaleX(x) {
        this.container.scale.x = x;
        if (this.physicsBody)
            Body.scale(this.physicsBody, x, this.scaleY);
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleY(y) {
        this.container.scale.y = y;
        if (this.physicsBody)
            Body.scale(this.physicsBody, this.scaleX, y);
    }
    get scaleY() {
        return this.container.scale.y;
    }
    set visible(value) {
        if (this.physicsBody) {
            if (value && !this.container.visible)
                Composite.add(this.engine.physicsEngine.world, this.physicsBody);
            else if (!value && this.container.visible)
                Composite.remove(this.engine.physicsEngine.world, this.physicsBody);
        }
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
        this.engine.removeGameObject(this);
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
        if (this.physicsBody)
            Composite.remove(this.engine.physicsEngine.world, this.physicsBody);
    }
}
