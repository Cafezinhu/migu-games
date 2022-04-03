import { Sprite as PIXISprite } from 'pixi.js';
import { GameObject } from "./GameObject";
export class Sprite extends GameObject {
    constructor(engine, options) {
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXISprite.from(options.spriteUrl);
        this.addContainerToParent(options.parent);
    }
}
