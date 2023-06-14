import { AnimatedSprite as PIXIAnimatedSprite, Resource, Texture } from 'pixi.js';
import { GameObject, type GameObjectOptions } from "./GameObject";
export declare type AnimatedSpriteOptions = GameObjectOptions & {
    textures: string[] | (Texture<Resource> | undefined)[] | undefined;
    autoPlay?: boolean;
    loop?: boolean;
    animationSpeed?: number;
};
export declare class AnimatedSprite extends GameObject {
    container: PIXIAnimatedSprite;
    constructor(options: AnimatedSpriteOptions);
    set animationSpeed(speed: number);
    get animationSpeed(): number;
    setAnimation(textures: string[] | (Texture<Resource> | undefined)[]): void;
}
