import { Collider, RigidBody } from "@dimforge/rapier2d-compat";
import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { ColliderData, PhysicsPlugin } from "../physics/Physics";
import { Vector } from "../Vector";

export type GameObjectOptions = {
    anchor?: Vector;
    parent?: GameObject;
    ignoreEmptyContainer?: boolean;
    ignoreStart?: boolean;
    zIndex?: number;
    tag?: string;
    engine?: Engine;
}

export class GameObject{
    container: Container;
    engine: Engine;
    parent: GameObject;
    children: GameObject[];
    private updateFunction: any;
    tag?: string;

    rigidBody?: RigidBody;
    collider?: Collider;
    colliderData?: ColliderData;
    
    constructor(options: GameObjectOptions){
        this.children = [];
        this.engine = options.engine ? options.engine : Engine.instance;
        this.engine.addGameObject(this);

        if(!options.ignoreEmptyContainer){
            this.container = new Container();
            this.endOptionsConfiguration(options);
        }

        //@ts-ignore
        if(this.start) {
            if(options && options.ignoreStart) return;
            //@ts-ignore
            this.start();
        }
    }

    addChild(child: GameObject){
        this.children.push(child);
        this.container.addChild(child.container);
        child.parent = this;
    }

    protected endOptionsConfiguration(options: GameObjectOptions){
        if(options.parent)
            options.parent.addChild(this);
        else
            this.engine.camera.addChild(this.container);
        
        if(options.anchor){
            //@ts-ignore
            if(this.container.anchor)
            {
                //@ts-ignore
                this.container.anchor.set(options.anchor.x, options.anchor.y);
            }
        }
        if(options.zIndex) this.container.zIndex = options.zIndex;
    }

    setCollider(colliderData: ColliderData){
        this.colliderData = colliderData;
        colliderData.collider.setActiveEvents(PhysicsPlugin.ActiveEvents.COLLISION_EVENTS);
        this.collider = this.engine.physicsWorld.createCollider(colliderData.collider, this.rigidBody);
    }

    setRigidbody(type: 'fixed' | 'dynamic', mass = 1){
        let rb = type == 'fixed' ? PhysicsPlugin.RigidBodyDesc.fixed() : PhysicsPlugin.RigidBodyDesc.dynamic();
        rb.setTranslation(this.x, this.y);
        rb.mass = mass;
        this.rigidBody = this.engine.physicsWorld.createRigidBody(rb);
    }

    set position(position: Vector){
        this.container.position.x = position.x;
        this.container.position.y = position.y;
        if(this.rigidBody)
            this.rigidBody.setTranslation({x: position.x, y: position.y}, true);
    }

    get position(){
        const position = this.container.position;
        return new Vector(position.x, position.y);
    }

    set x(value: number){
        this.container.position.x = value;
        if(this.rigidBody)
            this.rigidBody.setTranslation({x: value, y: this.y}, true);
    }

    get x(){
        return this.container.position.x;
    }

    set y(value: number){
        this.container.position.y = value;
        if(this.rigidBody)
            this.rigidBody.setTranslation({x: this.x, y: value}, true);
    }

    get y(){
        return this.container.position.y;
    }

    set rotation(rotation: number){
        this.container.rotation = rotation;
        if(this.rigidBody)
            this.rigidBody.setRotation(rotation, true);
    }

    get rotation(){
        return this.container.rotation;
    }

    set angle(angle: number){
        this.container.angle = angle;
        if(this.rigidBody)
            this.rigidBody.setRotation(angle/(Math.PI/180), true);
    }

    get angle(){
        return this.container.angle;
    }

    set scale(scale: Vector){
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
        this.scaleCollider();
    }

    get scale(){
        return new Vector(this.container.scale.x, this.container.scale.y);
    }

    set scaleX(x: number){
        this.container.scale.x = x;
        this.scaleCollider();
    }

    get scaleX(){
        return this.container.scale.x;
    }

    set scaleY(y: number){
        this.container.scale.y = y;
        this.scaleCollider();
    }

    get scaleY(){
        return this.container.scale.y;
    }

    scaleCollider(){
        //TODO: support scale
        if(this.colliderData){

        }
    }

    set visible(value: boolean){
        if(this.rigidBody){
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
        }
        this.container.visible = value;
    }

    get visible(){
        return this.container.visible;
    }

    set zIndex(z: number){
        this.container.zIndex = z;
    }

    get zIndex(){
        return this.container.zIndex;
    }

    lookAt(point: Vector){
        this.angle = point.clone().subtract(this.position).angleDeg();
    }

    onCollision(gameObject: GameObject | null, contacts: Vector[], started: boolean){

    }

    destroy(){
        this.engine.removeGameObject(this);
        if(this.updateFunction) 
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
        if(this.rigidBody)
            this.engine.physicsWorld.removeRigidBody(this.rigidBody);
    }
}