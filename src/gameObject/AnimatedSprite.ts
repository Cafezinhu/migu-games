import { AnimatedSprite as PIXIAnimatedSprite, Resource, Texture } from 'pixi.js';
import { GameObject, type GameObjectOptions } from "./GameObject";

export type AnimatedSpriteOptions = GameObjectOptions & {
    textures: string[] | (Texture<Resource> | undefined)[] | undefined;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
}

export class AnimatedSprite extends GameObject{
    container: PIXIAnimatedSprite;

    constructor(options: AnimatedSpriteOptions){
        options.ignoreEmptyContainer = true;
        super(options);

        const textures = options.textures.map(sprite => {
            if(typeof(sprite) == 'string')
                return Texture.from(sprite);
            return sprite;
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

    setAnimation(textures: string[] | (Texture<Resource> | undefined)[]){
        const t = textures.map(sprite => {
            if(typeof(sprite) == 'string')
                return Texture.from(sprite);
            return sprite;
        })
        this.container.textures = t;
    }
}