import { AnimatedSprite as PIXIAnimatedSprite } from 'pixi.js';
import { Engine } from '../Engine';
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type AnimatedSpriteOptions = GameObjectOptions & {
    spritesUrls: string[];
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
