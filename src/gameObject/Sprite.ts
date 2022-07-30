import {Resource, Sprite as PIXISprite, Texture} from 'pixi.js';
import { GameObject, type GameObjectOptions } from "./GameObject";

export type SpriteOptions = GameObjectOptions & {
    texture: string | Texture<Resource> | undefined;
}

export class Sprite extends GameObject{
    container: PIXISprite;
    constructor(options: SpriteOptions){
        options.ignoreEmptyContainer = true;
        super(options);
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