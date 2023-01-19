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
    private _gameObjectParent: GameObject;
    children: GameObject[];
    protected _updateFunction: any;
    tag?: string;
    destroyed: boolean;
    
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

        if(child._gameObjectParent){
            child._gameObjectParent.removeChild(child, false);
        }
        child._gameObjectParent = this;
    }

    removeChild(child: GameObject, addToCamera = true){
        this.children = this.children.filter(c => {
            return c != child;
        });
        child._gameObjectParent = null;
        if(child.container && addToCamera)
            this.engine.camera.addChild(child.container);
    }

    set parent(p: GameObject){
        if(this._gameObjectParent){
            this._gameObjectParent.removeChild(this, false);
        }
        this._gameObjectParent = p;
        if(p == null){
            this.engine.camera.addChild(this.container);
        }else{
            p.children.push(this);
            p.container.addChild(this.container);
        }
    }

    get parent(){
        return this._gameObjectParent;
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

    set position(position: Vector){
        this.container.position.x = position.x;
        this.container.position.y = position.y;
    }

    get position(){
        const position = this.container.position;
        return new Vector(position.x, position.y);
    }

    set x(value: number){
        this.container.position.x = value;
    }

    get x(){
        return this.container.position.x;
    }

    set y(value: number){
        this.container.position.y = value;
    }

    get y(){
        return this.container.position.y;
    }

    set rotation(rotation: number){
        this.container.rotation = rotation;
    }

    get rotation(){
        return this.container.rotation;
    }

    set angle(angle: number){
        this.container.angle = angle;
    }

    get angle(){
        return this.container.angle;
    }

    set scale(scale: Vector){
        this.container.scale.x = scale.x;
        this.container.scale.y = scale.y;
    }

    get scale(){
        return new Vector(this.container.scale.x, this.container.scale.y);
    }

    set scaleX(x: number){
        this.container.scale.x = x;
    }

    get scaleX(){
        return this.container.scale.x;
    }

    set scaleY(y: number){
        this.container.scale.y = y;
    }

    get scaleY(){
        return this.container.scale.y;
    }

    set visible(value: boolean){
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

    destroy(){
        this.children.forEach(child => child.destroy());
        this.engine.removeGameObject(this);
        if(this._updateFunction) 
            this.engine.pixiApplication.ticker.remove(this._updateFunction);
        this.container.destroy();
    }
}