import { Engine } from "./Engine";
import { Vector } from "./Vector";

export class Input{
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    constructor(engine: Engine){
        Input.engine = engine;
        Input.mousePos = new Vector(0,0);
        Input.ignoreOffset = false;
        engine.view.addEventListener('mousemove', e => {
            if(!Input.ignoreOffset){
                const world = engine.camera.toWorld(e.offsetX, e.offsetX);
                Input.mousePos = new Vector(world.x, world.y);
                return;
            }
            const world = engine.camera.toWorld(e.clientX, e.clientY);
            Input.mousePos = new Vector( world.x, world.y);
        });
    }

    static mouseEventToVector(e: MouseEvent){
        return new Vector(
            e.offsetX,
            e.offsetY
        );
    }

    static touchEventToVector(e: TouchEvent){
        const rect = Input.engine.view.getBoundingClientRect();
        return new Vector(
            e.touches[0].clientX - rect.left,
            e.touches[0].clientY - rect.top,
        );
    }
}