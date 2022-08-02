import { Vector } from "../Vector";
import { InputKey } from "./InputKey";
export class Input {
    constructor(engine) {
        Input.engine = engine;
        Input.mousePos = new Vector(0, 0);
        Input.ignoreOffset = false;
        Input.keys = new Map();
        engine.view.addEventListener('mousemove', e => {
            if (!Input.ignoreOffset) {
                const world = engine.camera.toWorld(e.offsetX, e.offsetY);
                Input.mousePos = new Vector(world.x, world.y);
                return;
            }
            const world = engine.camera.toWorld(e.clientX, e.clientY);
            Input.mousePos = new Vector(world.x, world.y);
        });
        document.addEventListener('keydown', e => {
            Input.pressKey(e.key);
        });
        document.addEventListener('keyup', e => {
            Input.releaseKey(e.key);
        });
        document.addEventListener('mousedown', e => {
            Input.pressKey(`mouse${e.button}`);
        });
        document.addEventListener('mouseup', e => {
            Input.releaseKey(`mouse${e.button}`);
        });
    }
    static mouseEventToVector(e) {
        const world = Input.engine.camera.toWorld(e.offsetX, e.offsetY);
        return new Vector(world.x, world.y);
    }
    static touchEventToVector(e) {
        const rect = Input.engine.view.getBoundingClientRect();
        const world = Input.engine.camera.toWorld(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        return new Vector(world.x, world.y);
    }
    static isKeyPressed(key) {
        const inputKey = Input.getKey(key);
        return inputKey.isPressed;
    }
    static pressedOnThisFrame(key) {
        const inputKey = Input.getKey(key);
        return inputKey.pressedOnThisFrame;
    }
    static releasedOnThisFrame(key) {
        const inputKey = Input.getKey(key);
        return inputKey.releasedOnThisFrame;
    }
    static pressKey(key) {
        const inputKey = Input.getKey(key);
        inputKey.press();
    }
    static releaseKey(key) {
        const inputKey = Input.getKey(key);
        inputKey.release();
    }
    static getKey(key) {
        key = key.toLowerCase();
        if (key == 'space')
            key = ' ';
        const keyInput = Input.keys.get(key);
        if (keyInput)
            return keyInput;
        return Input.createKey(key);
    }
    static createKey(key) {
        const newInputKey = new InputKey();
        Input.keys.set(key, newInputKey);
        return newInputKey;
    }
}
