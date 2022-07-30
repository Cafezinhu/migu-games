import { Resource, Sprite as PIXISprite, Texture } from 'pixi.js';
import { GameObject, type GameObjectOptions } from "./GameObject";
export declare type SpriteOptions = GameObjectOptions & {
    texture: string | Texture<Resource> | undefined;
};
export declare class Sprite extends GameObject {
    container: PIXISprite;
    constructor(options: SpriteOptions);
    get tint(): number;
    set tint(tint: number);
}
