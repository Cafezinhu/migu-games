import { AnimatedSprite as PIXIAnimatedSprite, Texture } from 'pixi.js';
import { GameObject } from "./GameObject";
export class AnimatedSprite extends GameObject {
    constructor(engine, options) {
        options.ignoreEmptyContainer = true;
        super(engine, options);
        const textures = options.textures.map(sprite => {
            if (typeof (sprite) == 'string')
                return Texture.from(sprite);
            return sprite;
        });
        this.container = new PIXIAnimatedSprite(textures);
        this.container.loop = options.loop;
        if (options.animationSpeed)
            this.container.animationSpeed = options.animationSpeed;
        if (options.autoPlay)
            this.container.play();
        this.endOptionsConfiguration(options);
    }
    set animationSpeed(speed) {
        this.container.animationSpeed = speed;
    }
    get animationSpeed() {
        return this.container.animationSpeed;
    }
}
