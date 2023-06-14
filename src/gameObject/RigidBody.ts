import { Collider, RigidBody as RapierRigidBody, RigidBodyDesc } from "@dimforge/rapier2d-compat";
import { ColliderData, PhysicsPlugin } from "../physics/Physics";
import { Vector } from "../Vector";
import { GameObject, GameObjectOptions } from "./GameObject";

export type RigidBodyOptions = GameObjectOptions & {
    colliderData?: ColliderData;
    rigidBodyType?: 'fixed' | 'dynamic' | 'kinematicVelocityBased' | 'kinematicPositionBased';
    mass?: number;
}

export class RigidBody extends GameObject {
    rigidBody: RapierRigidBody;
    collider?: Collider;
    colliderData?: ColliderData;

    constructor(options: RigidBodyOptions) {
        super(options);
        let rb: RigidBodyDesc;
        if(options.rigidBodyType == 'kinematicPositionBased'){
            rb = PhysicsPlugin.RigidBodyDesc.kinematicPositionBased();
        }else if(options.rigidBodyType == 'kinematicVelocityBased'){
            rb = PhysicsPlugin.RigidBodyDesc.kinematicVelocityBased();
        }else if(options.rigidBodyType == 'fixed'){
            rb = PhysicsPlugin.RigidBodyDesc.fixed();
        }else{
            rb = PhysicsPlugin.RigidBodyDesc.dynamic();
        }

        rb.mass = options.mass ? options.mass : 1;
        this.rigidBody = this.engine.physicsWorld.createRigidBody(rb);

        if(options.colliderData){
            this.setCollider(options.colliderData);
        }
    }

    setCollider(colliderData: ColliderData){
        this.colliderData = colliderData;
        colliderData.collider.setActiveEvents(PhysicsPlugin.ActiveEvents.COLLISION_EVENTS);
        this.collider = this.engine.physicsWorld.createCollider(colliderData.collider, this.rigidBody);
    }

    set position(position: Vector) {
        super.position = position;
        this.rigidBody.setTranslation({x: position.x, y: position.y}, true);
    }

    set x(value: number){
        super.x = value;
        this.rigidBody.setTranslation({x: value, y: this.y}, true);
    }

    get x() {
        return super.x;
    }

    set y(value: number){
        super.y = value;
        this.rigidBody.setTranslation({x: this.x, y: value}, true);
    }

    get y() {
        return super.y;
    }

    set rotation(rotation: number){
        super.rotation = rotation;
        this.rigidBody.setRotation(rotation, true);
    }

    get rotation(){
        return super.rotation;
    }

    get angle(){
        return super.angle;
    }

    set angle(angle: number){
        super.angle = angle;
        this.rigidBody.setRotation(angle/(Math.PI/180), true);
    }

    //TODO: scale

    set scale(_: any){
        console.warn("Scaling rigidbodies is not supported.");
    }

    set visible(value: boolean){
        if(value && !this.container.visible) {
            if(this.colliderData){
                this.setCollider(this.colliderData);
            }
            this.rigidBody.wakeUp();
        }
        else if(!value && this.container.visible){
            if(this.collider){
                this.engine.physicsWorld.removeCollider(this.collider, false);
            }
            this.rigidBody.sleep();
        }
        this.container.visible = value;
        //TODO: set collider visibility on children
    }

    get visible(){
        return super.visible;
    }

    onCollision(gameObject: RigidBody | null, contacts: Vector[], started: boolean){}

    destroy(){
        super.destroy();
        this.engine.physicsWorld.removeRigidBody(this.rigidBody);
        //TODO: destroy rigidbody on children
    }
}