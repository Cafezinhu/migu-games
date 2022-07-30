import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { Physics } from "../Physics";
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
    setCollider(colliderData) {
        this.colliderData = colliderData;
        colliderData.collider.setActiveEvents(Physics.ActiveEvents.COLLISION_EVENTS);
        this.collider = this.engine.physicsWorld.createCollider(colliderData.collider, this.rigidBody);
    }
    setRigidbody(type, mass = 1) {
        let rb = type == 'fixed' ? Physics.RigidBodyDesc.fixed() : Physics.RigidBodyDesc.dynamic();
        rb.setTranslation(this.x, this.y);
        rb.mass = mass;
        this.rigidBody = this.engine.physicsWorld.createRigidBody(rb);
    }
    set position(position) {
        this.container.position.x = position.x;
        this.container.position.y = position.y;
        if (this.rigidBody)
            this.rigidBody.setTranslation({ x: position.x, y: -position.y }, true);
    }
    get position() {
        const position = this.container.position;
        return new Vector(position.x, position.y);
    }
    set x(value) {
        this.container.position.x = value;
        if (this.rigidBody)
            this.rigidBody.setTranslation({ x: value, y: -this.y }, true);
    }
    get x() {
        return this.container.position.x;
    }
    set y(value) {
        this.container.position.y = value;
        if (this.rigidBody)
            this.rigidBody.setTranslation({ x: this.x, y: -value }, true);
    }
    get y() {
        return this.container.position.y;
    }
    set rotation(rotation) {
        this.container.rotation = rotation;
        if (this.rigidBody)
            this.rigidBody.setRotation(rotation, true);
    }
    get rotation() {
        return this.container.rotation;
    }
    set angle(angle) {
        this.container.angle = angle;
        if (this.rigidBody)
            this.rigidBody.setRotation(angle / (Math.PI / 180), true);
    }
    get angle() {
        return this.container.angle;
    }
    set scale(scale) {
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
        this.scaleCollider();
    }
    get scale() {
        return new Vector(this.container.scale.x, this.container.scale.y);
    }
    set scaleX(x) {
        this.container.scale.x = x;
        this.scaleCollider();
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleY(y) {
        this.container.scale.y = y;
        this.scaleCollider();
    }
    get scaleY() {
        return this.container.scale.y;
    }
    scaleCollider() {
        //TODO: support scale
        if (this.colliderData) {
        }
    }
    set visible(value) {
        if (this.rigidBody) {
            if (value && !this.container.visible) {
                if (this.colliderData) {
                    this.setCollider(this.colliderData);
                }
                this.rigidBody.wakeUp();
            }
            else if (!value && this.container.visible) {
                if (this.collider) {
                    this.engine.physicsWorld.removeCollider(this.collider, false);
                }
                this.rigidBody.sleep();
            }
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
    onCollision(gameObject, contacts, started) {
    }
    destroy() {
        this.engine.removeGameObject(this);
        if (this.updateFunction)
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
        if (this.rigidBody)
            this.engine.physicsWorld.removeRigidBody(this.rigidBody);
    }
}
