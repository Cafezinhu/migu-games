import { Engine } from "../Engine";
import { Vector } from "../Vector";
import { MiguGamepad } from "./Gamepad";
import { InputKey } from "./InputKey";

export class Input{
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    static keys: Map<string, InputKey>;
    static maps: Map<string, string[]>;
    static axes: Map<string, (string[] | number)[]>;
    static vectors: Map<string, (string[] | string)[]>;
    constructor(engine: Engine){
        Input.engine = engine;
        Input.mousePos = new Vector(0,0);
        Input.ignoreOffset = false;
        Input.keys = new Map();
        Input.axes = new Map();
        Input.vectors = new Map();
        Input.maps = new Map();
        engine.view.addEventListener('mousemove', (e: MouseEvent) => {
            if(!Input.ignoreOffset){
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

    static mouseEventToVector(e: MouseEvent){
        const world = Input.engine.camera.toWorld(e.offsetX, e.offsetY);
        return new Vector(world.x, world.y);
    }

    static touchEventToVector(e: TouchEvent){
        const rect = Input.engine.view.getBoundingClientRect();
        //@ts-ignore
        const world = Input.engine.camera.toWorld(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        return new Vector(world.x, world.y);
    }

    static isKeyPressed(key: string){
        const inputKey = Input.getKey(key);
        return inputKey.isPressed;
    }

    static pressedOnThisFrame(key: string){
        const inputKey = Input.getKey(key);
        return inputKey.pressedOnThisFrame;
    }

    static releasedOnThisFrame(key: string){
        const inputKey = Input.getKey(key);
        return inputKey.releasedOnThisFrame;
    }

    static axisFromKeys(negative: string, positive: string){
        const negativeKey = Input.getKey(negative);
        const positiveKey = Input.getKey(positive);

        if(positiveKey.isPressed){
            return positiveKey.value;
        }else if(negativeKey.isPressed){
            return -negativeKey.value;
        }else{
            return 0;
        }
    }

    static vectorFromKeys(left: string, right: string, up: string, down: string){
        const x = Input.axisFromKeys(left, right);
        const y = Input.axisFromKeys(up, down);
        let vector = new Vector(x, y);
        if(vector.magnitude() > 1){
            vector = vector.normalize();
        }
        return vector;
    }

    static valueFromKey(key: string){
        const k = Input.getKey(key);
        return k.value;
    }

    static pressKey(key: string, value = 1){
        const inputKey = Input.getKey(key);

        inputKey.press(value);

        Input.maps.forEach((keys, mapName) => {
            keys.forEach(k => {
                if (cleanKeyName(k) == cleanKeyName(key)){
                    const inputKey = Input.getKey(mapName);
                    inputKey.press(value);
                }
            })
        });
    }

    static releaseKey(key: string){
        const inputKey = Input.getKey(key);

        inputKey.release();

        Input.maps.forEach((keys, mapName) => {
            keys.forEach(k => {
                if (cleanKeyName(k) == cleanKeyName(key)){
                    const inputKey = Input.getKey(mapName);
                    inputKey.release();
                }
            })
        });
    }

    static getKey(key: string){
        key = cleanKeyName(key);
        const keyInput = Input.keys.get(key);
        if(keyInput) return keyInput;

        return Input.createKey(key);
    }

    static createKey(key: string){
        const newInputKey = new InputKey();
        Input.keys.set(key, newInputKey);
        return newInputKey;
    }

    static mapKeys(name: string, keys: string[]){
        Input.createKey(cleanKeyName(name));
        Input.maps.set(name, keys.map(key => cleanKeyName(key)));
    }

    static mapAxis(name: string, axes: (string[] | number)[]){
        axes.forEach(axis => {
            if(typeof(axis) == "object" && axis.length != 2){
                console.error(`Invalid axis value detected. Axis ${name} should be a single number or an array of 2 strings.\nCurrent value: ${JSON.stringify(axis)}`);
                return;
            }
        })
        
        Input.axes.set(name, axes);
    }

    static getAxis(name: string){
        const axis = Input.axes.get(name);
        if(axis){
            axis.forEach(a => {
                let value = 0;
                if(typeof(a) == 'number'){
                    const gamepad = navigator.getGamepads()[0];
                    if(gamepad)
                        value = gamepad.axes[a];
                }else{
                    if(a.length == 2)
                        value = Input.axisFromKeys(a[0], a[1]);
                    else
                        console.error(`Invalid axis value detected. Axis ${name} should be a single number or an array of 2 strings.`);
                }
                if(value != 0) return value;
            });

            return 0;
        }else{
            console.error(`Axis ${name} not found!`);
            return 0;
        }
    }

    static mapVector(name: string, vectors: (string[] | string)[]){
        vectors.forEach(vector => {
            if(typeof(vector) == "object" && vector.length != 4){
                console.error(`Invalid vector value detected. Vector ${name} should be a string (MiguGamepad.LeftStick or MiguGamepad.RightStick) or an array of 4 strings.\nCurrent value: ${JSON.stringify(vector)}`);
                return;
            }
        })
        
        Input.vectors.set(name, vectors);
    }

    static getVector(name: string){
        const vector = Input.vectors.get(name);
        if(vector){
            vector.forEach(v => {
                let value = Vector.Zero();
                if(typeof(v) == "string"){
                    const gamepad = navigator.getGamepads()[0];
                    if(gamepad){
                        if(v == MiguGamepad.LeftStick){
                            value = new Vector(gamepad.axes[0], gamepad.axes[1]);
                        }else if(v == MiguGamepad.RightStick){
                            value = new Vector(gamepad.axes[2], gamepad.axes[3]);
                        }
                    }
                }else{
                    if(v.length == 4){
                        value = Input.vectorFromKeys(v[0], v[1], v[2], v[3]);
                    }else{
                        console.error(`Invalid vector value detected. Vector ${name} should be a string (MiguGamepad.LeftStick or MiguGamepad.RightStick) or an array of 4 strings.`);
                    }
                }
                if(value.magnitude() != 0) return value;
            });

            return Vector.Zero();
        }else{
            console.error(`Vector ${name} not found!`);
            return Vector.Zero();
        }
    }

    static updateGamepad(){
        const gamepad = navigator.getGamepads()[0];

        if(!gamepad) return;

        gamepad.buttons.forEach((button, index) => {
            const key = Input.getKey(`gamepad${index}`);
            if(key.isPressed && !button.pressed) Input.releaseKey(`gamepad${index}`);
            else if(!key.isPressed && button.pressed || button.value != 0 && button.value != 1) Input.pressKey(`gamepad${index}`, button.value);
        });
    }
}

function cleanKeyName(key: string){
    let cleanedKey = key.toLowerCase();
    if(cleanedKey == 'space') cleanedKey = ' ';
    return cleanedKey;
}