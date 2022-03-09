import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { Engine } from "./Engine";
import { Vector } from "./Vector";

export type GameObjectOptions = {
    spriteUrl?: string | string[];
    anchor?: Vector;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
}

export class GameObject{
    container: Container;
    engine: Engine;
    private updateFunction: any;
    
    constructor(engine: Engine, options?: GameObjectOptions){
        if(options && options.spriteUrl){
            if(typeof(options.spriteUrl) == 'string')
                this.container = Sprite.from(options.spriteUrl);
            else{
                const textures = options.spriteUrl.map(url => {
                    return Texture.from(url);
                })
                this.container = new AnimatedSprite(textures);
                const container = this.container as AnimatedSprite;
                container.loop = options.loop;
                if(options.animationSpeed) 
                    container.animationSpeed = options.animationSpeed;
                if(options.autoPlay) container.play();
            }
        }
        else
            this.container = new Container();

        this.engine = engine;
        this.engine.stage.addChild(this.container);

        if(options && options.anchor){
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

    set animationSpeed(speed: number){
        (this.container as AnimatedSprite).animationSpeed = speed;
    }

    get animationSpeed(){
        return (this.container as AnimatedSprite).animationSpeed;
    }

    destroy(){
        if(this.updateFunction) 
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.container.destroy();
    }
}