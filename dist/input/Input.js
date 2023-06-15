import { Vector } from "../Vector";
import { InputKey } from "./InputKey";
export class Input {
    // static axes: Map<string, (string[] | number)[]>
    constructor(engine) {
        Input.engine = engine;
        Input.mousePos = new Vector(0, 0);
        Input.ignoreOffset = false;
        Input.keys = new Map();
        // Input.axis = new Map();
        Input.maps = new Map();
        engine.view.addEventListener('mousemove', (e) => {
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
        //@ts-ignore
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
    static axisFromKeys(negative, positive) {
        const negativeKey = Input.getKey(negative);
        const positiveKey = Input.getKey(positive);
        if (positiveKey.isPressed) {
            return positiveKey.value;
        }
        else if (negativeKey.isPressed) {
            return -negativeKey.value;
        }
        else {
            return 0;
        }
    }
    static vectorFromKeys(left, right, up, down) {
        const x = Input.axisFromKeys(left, right);
        const y = Input.axisFromKeys(up, down);
        let vector = new Vector(x, y);
        if (vector.magnitude() > 1) {
            vector = vector.normalize();
        }
        return vector;
    }
    static valueFromKey(key) {
        const k = Input.getKey(key);
        return k.value;
    }
    static pressKey(key, value = 1) {
        const inputKey = Input.getKey(key);
        inputKey.press(value);
        Input.maps.forEach((keys, mapName) => {
            keys.forEach(k => {
                if (cleanKeyName(k) == cleanKeyName(key)) {
                    const inputKey = Input.getKey(mapName);
                    inputKey.press(value);
                }
            });
        });
    }
    static releaseKey(key) {
        const inputKey = Input.getKey(key);
        inputKey.release();
        Input.maps.forEach((keys, mapName) => {
            keys.forEach(k => {
                if (cleanKeyName(k) == cleanKeyName(key)) {
                    const inputKey = Input.getKey(mapName);
                    inputKey.release();
                }
            });
        });
    }
    static getKey(key) {
        key = cleanKeyName(key);
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
    static mapKeys(name, keys) {
        Input.createKey(cleanKeyName(name));
        Input.maps.set(name, keys.map(key => cleanKeyName(key)));
    }
    static updateGamepad() {
        const gamepad = navigator.getGamepads()[0];
        if (!gamepad)
            return;
        gamepad.buttons.forEach((button, index) => {
            const key = Input.getKey(`gamepad${index}`);
            if (key.isPressed && !button.pressed)
                Input.releaseKey(`gamepad${index}`);
            else if (!key.isPressed && button.pressed || button.value != 0 && button.value != 1)
                Input.pressKey(`gamepad${index}`, button.value);
        });
    }
}
function cleanKeyName(key) {
    let cleanedKey = key.toLowerCase();
    if (cleanedKey == 'space')
        cleanedKey = ' ';
    return cleanedKey;
}
