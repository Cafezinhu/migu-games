import { Sprite as PIXISprite } from 'pixi.js';
import { GameObject } from "./GameObject";
export class Sprite extends GameObject {
    constructor(options) {
        options.ignoreEmptyContainer = true;
        super(options);
        this.container = PIXISprite.from(options.texture);
        this.endOptionsConfiguration(options);
    }
    get tint() {
        return this.container.tint;
    }
    set tint(tint) {
        this.container.tint = tint;
    }
}
