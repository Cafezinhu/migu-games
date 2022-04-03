import { Container } from "pixi.js";
import { Engine } from "../Engine";
import { Vector } from "../Vector";

export type GameObjectOptions = {
    anchor?: Vector;
    parent?: GameObject;
    ignoreEmptyContainer?: boolean;
}

export class GameObject{
    container: Container;
    engine: Engine;
    parent: GameObject;
    children: GameObject[];
    private updateFunction: any;
    
    constructor(engine: Engine, options: GameObjectOptions){
        this.children = [];

        if(!options.ignoreEmptyContainer){
            this.container = new Container();
            this.addContainerToParent(options.parent);
        }

        this.engine = engine;

        if(options.anchor){
            //@ts-ignore
            if(this.container.anchor)
            {
                //@ts-ignore
                this.container.anchor.set(options.anchor.x, options.anchor.y);
            }
        }

        //@ts-ignore
        if(this.update){
            this.updateFunction = (delta: number) => {
                //@ts-ignore
                this.update(delta);
            };
            this.engine.pixiApplication.ticker.add(this.updateFunction);
        }

        //@ts-ignore
        if(this.start) this.start();
        
    }

    addChild(child: GameObject){
        this.children.push(child);
        this.container.addChild(child.container);
        child.parent = this;
    }

    protected addContainerToParent(parent: GameObject){
        if(parent)
            parent.addChild(this);
        else
            this.engine.stage.addChild(this.container);
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

    lookAt(point: Vector){
        this.angle = point.clone().subtract(this.position).angleDeg();
    }

    destroy(){
        if(this.updateFunction) 
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
    }
}