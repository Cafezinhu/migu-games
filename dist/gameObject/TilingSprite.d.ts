import { Resource, Texture, TilingSprite as PIXITilingSprite } from 'pixi.js';
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
    constructor(options: TilingSpriteOptions);
    set offset(offset: Vector);
    get offset(): Vector;
}
