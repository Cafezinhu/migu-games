import { Sprite as PIXISprite } from 'pixi.js';
import { GameObject } from "./GameObject";
export class Sprite extends GameObject {
    constructor(engine, options) {
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXISprite.from(options.spriteUrl);
        this.endOptionsConfiguration(options);
    }
    get tint() {
        return this.container.tint;
    }
    set tint(tint) {
        this.container.tint = tint;
    }
}
