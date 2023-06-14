import { GameObject } from "./GameObject";
export class Area extends GameObject {
    constructor(options) {
        super(options);
        this.collider = this.engine.physicsWorld.createCollider(options.colliderData.collider);
        this.collider.setSensor(true);
    }
    set position(position) {
        super.position = position;
        this.collider.setTranslation({ x: position.x, y: position.y });
    }
    set x(value) {
        super.x = value;
        this.collider.setTranslation({ x: value, y: this.y });
    }
    get x() {
        return super.x;
    }
    set y(value) {
        super.y = value;
        this.collider.setTranslation({ x: this.x, y: value });
    }
    get y() {
        return super.y;
    }
    set rotation(rotation) {
        super.rotation = rotation;
        this.collider.setRotation(rotation);
    }
    get rotation() {
        return super.rotation;
    }
    get angle() {
        return super.angle;
    }
    set angle(angle) {
        super.angle = angle;
        this.collider.setRotation(angle / (Math.PI / 180));
    }
    //TODO: scale
    set scale(_) {
        console.warn("Scaling areas is not supported.");
    }
    set visible(value) {
        this.container.visible = value;
        //TODO: set collider visibility on children
    }
    get visible() {
        return super.visible;
    }
    onCollision(gameObject, contacts, started) { }
    destroy() {
        super.destroy();
        this.engine.physicsWorld.removeCollider(this.collider, true);
        //TODO: destroy rigidbody on children
    }
}
