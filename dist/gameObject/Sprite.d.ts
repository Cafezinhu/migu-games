import { Sprite as PIXISprite } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type SpriteOptions = GameObjectOptions & {
    spriteUrl: string;
};
export declare class Sprite extends GameObject {
    container: PIXISprite;
    constructor(engine: Engine, options: SpriteOptions);
    get tint(): number;
    set tint(tint: number);
}
