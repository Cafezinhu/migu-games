import { Sprite } from "pixi.js";
import { Engine } from "./Engine";
import { Vector } from "./Vector";

export type GameObjectOptions = {
    spriteUrl?: string;
    engine: Engine;
}

export class GameObject{
    sprite: Sprite;
    engine: Engine;
    private updateFunction: any;
    
    constructor(options: GameObjectOptions){
        this.sprite = Sprite.from(options.spriteUrl);
        this.engine = options.engine;
        this.engine.stage.addChild(this.sprite);

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
        this.sprite.position.x = position.x;
        this.sprite.position.y = position.y;
    }

    get position(){
        const position = this.sprite.position;
        return new Vector(position.x, position.y);
    }

    set rotation(rotation: number){
        this.sprite.rotation = rotation;
    }

    get rotation(){
        return this.sprite.rotation;
    }

    destroy(){
        if(this.updateFunction) 
            this.engine.pixiApplication.ticker.remove(this.updateFunction);
        this.sprite.destroy();
    }
}