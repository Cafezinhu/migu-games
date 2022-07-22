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
        const world = Input.engine.camera.toWorld(e.offsetX, e.offsetX);
        return new Vector(world.x, world.y);
    }

    static touchEventToVector(e: TouchEvent){
        const rect = Input.engine.view.getBoundingClientRect();
        const world = Input.engine.camera.toWorld(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        return new Vector(world.x, world.y);
    }
}