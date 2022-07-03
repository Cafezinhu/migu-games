import { TilingSprite as PIXITilingSprite } from 'pixi.js';
import { Vector } from '../Vector';
import { GameObject } from "./GameObject";
export class TilingSprite extends GameObject {
    constructor(engine, options) {
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXITilingSprite.from(options.texture, {
            width: options.tilingSize.width,
            height: options.tilingSize.height
        });
        this.endOptionsConfiguration(options);
    }
    set offset(offset) {
        this.container.tilePosition.set(offset.x, offset.y);
    }
    get offset() {
        const tilePosition = this.container.tilePosition;
        return new Vector(tilePosition.x, tilePosition.y);
    }
}
