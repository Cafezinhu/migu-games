import { Engine } from "./Engine";
import { Vector } from "./Vector";

export class Input{
    static engine: Engine;
    static mousePos: Vector;
    constructor(engine: Engine){
        Input.engine = engine;
        Input.mousePos = new Vector(0,0);
        engine.view.addEventListener('mousemove', e => {
            Input.mousePos = new Vector(
                e.offsetX/engine.scaleRatio,
                e.offsetY/engine.scaleRatio
            );
        })
    }

    static mouseEventToVector(e: MouseEvent){
        return new Vector(
            e.offsetX/Input.engine.scaleRatio,
            e.offsetY/Input.engine.scaleRatio
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