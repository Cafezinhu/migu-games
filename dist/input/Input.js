import { Vector } from "../Vector";
import { MiguGamepad } from "./Gamepad";
import { InputKey } from "./InputKey";
export class Input {
    constructor(engine) {
        Input.engine = engine;
        Input.mousePos = new Vector(0, 0);
        Input.ignoreOffset = false;
        Input.keys = new Map();
        Input.axes = new Map();
        Input.vectors = new Map();
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
    static mapAxis(name, axes) {
        axes.forEach(axis => {
            if (typeof (axis) == "object" && axis.length != 2) {
                console.error(`Invalid axis value detected. Axis ${name} should be a single number or an array of 2 strings.\nCurrent value: ${JSON.stringify(axis)}`);
                return;
            }
        });
        Input.axes.set(name, axes);
    }
    static getAxis(name) {
        const axis = Input.axes.get(name);
        if (axis) {
            let currentValue = 0;
            axis.forEach(a => {
                let value = 0;
                if (typeof (a) == 'number') {
                    const gamepad = navigator.getGamepads()[0];
                    if (gamepad)
                        value = gamepad.axes[a];
                }
                else {
                    if (a.length == 2)
                        value = Input.axisFromKeys(a[0], a[1]);
                    else
                        console.error(`Invalid axis value detected. Axis ${name} should be a single number or an array of 2 strings.`);
                }
                if (value != 0)
                    currentValue = value;
            });
            return currentValue;
        }
        else {
            console.error(`Axis ${name} not found!`);
            return 0;
        }
    }
    static mapVector(name, vectors) {
        vectors.forEach(vector => {
            if (typeof (vector) == "object" && vector.length != 4) {
                console.error(`Invalid vector value detected. Vector ${name} should be a string (MiguGamepad.LeftStick or MiguGamepad.RightStick) or an array of 4 strings.\nCurrent value: ${JSON.stringify(vector)}`);
                return;
            }
        });
        Input.vectors.set(name, vectors);
    }
    static getVector(name) {
        const vector = Input.vectors.get(name);
        if (vector) {
            let currentVector = Vector.Zero();
            vector.forEach(v => {
                let value = Vector.Zero();
                if (typeof (v) == "string") {
                    const gamepad = navigator.getGamepads()[0];
                    if (gamepad) {
                        if (v == MiguGamepad.LeftStick) {
                            value = new Vector(gamepad.axes[0], gamepad.axes[1]);
                        }
                        else if (v == MiguGamepad.RightStick) {
                            value = new Vector(gamepad.axes[2], gamepad.axes[3]);
                        }
                    }
                }
                else {
                    if (v.length == 4) {
                        value = Input.vectorFromKeys(v[0], v[1], v[2], v[3]);
                    }
                    else {
                        console.error(`Invalid vector value detected. Vector ${name} should be a string (MiguGamepad.LeftStick or MiguGamepad.RightStick) or an array of 4 strings.`);
                    }
                }
                if (value.magnitude() != 0)
                    currentVector = value;
            });
            return currentVector;
        }
        else {
            console.error(`Vector ${name} not found!`);
            return Vector.Zero();
        }
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
