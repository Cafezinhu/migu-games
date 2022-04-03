import { AnimatedSprite as PIXIAnimatedSprite, Texture } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";

export type AnimatedSpriteOptions = GameObjectOptions & {
    spritesUrls: string[];
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
}

export class AnimatedSprite extends GameObject{
    container: PIXIAnimatedSprite;

    constructor(engine: Engine, options: AnimatedSpriteOptions){
        options.ignoreEmptyContainer = true;
        super(engine, options);

        const textures = options.spritesUrls.map(url => {
            return Texture.from(url);
        })
        this.container = new PIXIAnimatedSprite(textures);
        this.container.loop = options.loop;
        if(options.animationSpeed) 
            this.container.animationSpeed = options.animationSpeed;
        if(options.autoPlay) this.container.play();
        this.addContainerToParent(options.parent);
    }

    set animationSpeed(speed: number){
        this.container.animationSpeed = speed;
    }

    get animationSpeed(){
        return this.container.animationSpeed;
    }
}