import {Sprite as PIXISprite} from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";

export type SpriteOptions = GameObjectOptions & {
    spriteUrl: string;
}

export class Sprite extends GameObject{
    container: PIXISprite;
    constructor(engine: Engine, options: SpriteOptions){
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXISprite.from(options.spriteUrl);
        this.endOptionsConfiguration(options);
    }

    get tint(){
        return this.container.tint;
    }

    set tint(tint: number){
        this.container.tint = tint;
    }
}