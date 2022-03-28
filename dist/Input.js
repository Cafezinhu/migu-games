import { Vector } from "./Vector";
export class Input {
    constructor(engine) {
        this.engine = engine;
        Input.mousePos = new Vector(0, 0);
        engine.view.addEventListener('mousemove', e => {
            Input.mousePos = new Vector(e.offsetX / engine.scaleRatio, e.offsetY / engine.scaleRatio);
        });
    }
}
