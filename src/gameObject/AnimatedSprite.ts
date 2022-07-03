import { AnimatedSprite as PIXIAnimatedSprite, Resource, Texture } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";

export type AnimatedSpriteOptions = GameObjectOptions & {
    textures: string[] | Texture<Resource>[] | undefined;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
}

export class AnimatedSprite extends GameObject{
    container: PIXIAnimatedSprite;

    constructor(engine: Engine, options: AnimatedSpriteOptions){
        options.ignoreEmptyContainer = true;
        super(engine, options);

        const textures = options.textures.map(sprite => {
            return Texture.from(sprite);
        })
        this.container = new PIXIAnimatedSprite(textures);
        this.container.loop = options.loop;
        if(options.animationSpeed) 
            this.container.animationSpeed = options.animationSpeed;
        if(options.autoPlay) this.container.play();
        this.endOptionsConfiguration(options);
    }

    set animationSpeed(speed: number){
        this.container.animationSpeed = speed;
    }

    get animationSpeed(){
        return this.container.animationSpeed;
    }
}