import { Resource, Texture, TilingSprite as PIXITilingSprite } from 'pixi.js';
import { Engine } from '../Engine';
import { Vector } from '../Vector';
import { GameObject, GameObjectOptions } from "./GameObject";

export type TilingSpriteOptions = GameObjectOptions & {
    texture?: string | Texture<Resource>;
    tilingSize: {
        width: number,
        height: number
    };
}

export class TilingSprite extends GameObject{
    container: PIXITilingSprite;

    constructor(engine: Engine, options: TilingSpriteOptions){
        options.ignoreEmptyContainer = true;
        super(engine, options);
        this.container = PIXITilingSprite.from(options.texture, {
            width: options.tilingSize.width,
            height: options.tilingSize.height
        });
        this.endOptionsConfiguration(options);
    }

    set offset(offset: Vector){
        this.container.tilePosition.set(offset.x, offset.y);
    }

    get offset(){
        const tilePosition = this.container.tilePosition;
        return new Vector(tilePosition.x, tilePosition.y);
    }
}