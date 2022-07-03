import { TilingSprite as PIXITilingSprite } from 'pixi.js';
import { Engine } from '../Engine';
import { Vector } from '../Vector';
import { GameObject, GameObjectOptions } from "./GameObject";
export declare type TilingSpriteOptions = GameObjectOptions & {
    spriteUrl: string;
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