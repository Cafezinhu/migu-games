import { Resource, Texture, TilingSprite as PIXITilingSprite } from 'pixi.js';
import { Engine } from '../Engine';
import { Vector } from '../Vector';
import { GameObject, type GameObjectOptions } from "./GameObject";
export declare type TilingSpriteOptions = GameObjectOptions & {
    texture?: string | Texture<Resource>;
    tilingSize: {
        width: number;
        height: number;
    };
};
export declare class TilingSprite extends GameObject {
    container: PIXITilingSprite;
    constructor(engine: Engine, options: TilingSpriteOptions);
    set offset(offset: Vector);
    get offset(): Vector;
}
