import {Resource, Sprite as PIXISprite, Texture} from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";

export type SpriteOptions = GameObjectOptions & {
    texture: string | Texture<Resource> | undefined;
}

export class Sprite extends GameObject{
    container: PIXISprite;
    constructor(engine: Engine, options: SpriteOptions){
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXISprite.from(options.texture);
        this.endOptionsConfiguration(options);
    }

    get tint(){
        return this.container.tint;
    }

    set tint(tint: number){
        this.container.tint = tint;
    }
}