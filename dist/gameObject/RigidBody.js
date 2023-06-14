import { PhysicsPlugin } from "../physics/Physics";
import { GameObject } from "./GameObject";
export class RigidBody extends GameObject {
    constructor(options) {
        super(options);
        let rb;
        if (options.rigidBodyType == 'fixed') {
            rb = PhysicsPlugin.RigidBodyDesc.fixed();
        }
        else {
            rb = PhysicsPlugin.RigidBodyDesc.dynamic();
        }
        rb.mass = options.mass ? options.mass : 1;
        this.rigidBody = this.engine.physicsWorld.createRigidBody(rb);
        if (options.colliderData) {
            this.setCollider(options.colliderData);
        }
    }
    setCollider(colliderData) {
        this.colliderData = colliderData;
        colliderData.collider.setActiveEvents(PhysicsPlugin.ActiveEvents.COLLISION_EVENTS);
        this.collider = this.engine.physicsWorld.createCollider(colliderData.collider, this.rigidBody);
    }
    set position(position) {
        super.position = position;
        this.rigidBody.setTranslation({ x: position.x, y: position.y }, true);
    }
    set x(value) {
        super.x = value;
        this.rigidBody.setTranslation({ x: value, y: this.y }, true);
    }
    get x() {
        return super.x;
    }
    set y(value) {
        super.y = value;
        this.rigidBody.setTranslation({ x: this.x, y: value }, true);
    }
    get y() {
        return super.y;
    }
    set rotation(rotation) {
        super.rotation = rotation;
        this.rigidBody.setRotation(rotation, true);
    }
    get rotation() {
        return super.rotation;
    }
    get angle() {
        return super.angle;
    }
    set angle(angle) {
        super.angle = angle;
        this.rigidBody.setRotation(angle / (Math.PI / 180), true);
    }
    //TODO: scale
    set scale(_) {
        console.warn("Scaling rigidbodies is not supported.");
    }
    set visible(value) {
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
        this.container.visible = value;
        //TODO: set collider visibility on children
    }
    get visible() {
        return super.visible;
    }
    onCollision(gameObject, contacts, started) { }
    destroy() {
        super.destroy();
        this.engine.physicsWorld.removeRigidBody(this.rigidBody);
        //TODO: destroy rigidbody on children
    }
}
