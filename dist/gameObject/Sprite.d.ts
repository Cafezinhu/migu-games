import { Resource, Sprite as PIXISprite, Texture } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type SpriteOptions = GameObjectOptions & {
    texture: string | Texture<Resource> | undefined;
};
export declare class Sprite extends GameObject {
    container: PIXISprite;
    constructor(engine: Engine, options: SpriteOptions);
    get tint(): number;
    set tint(tint: number);
}
