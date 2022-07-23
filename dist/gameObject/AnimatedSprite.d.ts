import { AnimatedSprite as PIXIAnimatedSprite, Resource, Texture } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, type GameObjectOptions } from "./GameObject";
export declare type AnimatedSpriteOptions = GameObjectOptions & {
    textures: string[] | (Texture<Resource> | undefined)[] | undefined;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
};
export declare class AnimatedSprite extends GameObject {
    container: PIXIAnimatedSprite;
    constructor(engine: Engine, options: AnimatedSpriteOptions);
    set animationSpeed(speed: number);
    get animationSpeed(): number;
}
