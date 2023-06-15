import { Engine } from "../Engine";
import { Vector } from "../Vector";
import { InputKey } from "./InputKey";

export class Input{
    static engine: Engine;
    static mousePos: Vector;
    static ignoreOffset: boolean;
    static keys: Map<string, InputKey>;
    static maps: Map<string, string[]>;
    constructor(engine: Engine){
        Input.engine = engine;
        Input.mousePos = new Vector(0,0);
        Input.ignoreOffset = false;
        Input.keys = new Map();
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

    static getAxis(negative: string, positive: string){
        const negativeKey = Input.getKey(negative);
        const positiveKey = Input.getKey(positive);

        if(positiveKey.isPressed){
            return 1;
        }else if(negativeKey.isPressed){
            return -1;
        }else{
            return 0;
        }
    }

    static getVector(left: string, right: string, up: string, down: string){
        const x = Input.getAxis(left, right);
        const y = Input.getAxis(up, down);
        let vector = new Vector(x, y);
        if(vector.magnitude() > 1){
            vector = vector.normalize();
        }
        return vector;
    }

    static pressKey(key: string){
        const inputKey = Input.getKey(key);

        inputKey.press();

        Input.maps.forEach((keys, mapName) => {
            keys.forEach(k => {
                if (cleanKeyName(k) == cleanKeyName(key)){
                    const inputKey = Input.getKey(mapName);
                    inputKey.press();
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

    static updateGamepad(){
        const gamepad = navigator.getGamepads()[0];

        if(!gamepad) return;

        gamepad.buttons.forEach((button, index) => {
            const key = Input.keys.get(`gamepad${index}`);
            if(key.isPressed && !button.pressed) key.release();
            else if(!key.isPressed && button.pressed) key.press();
        });
    }
}

function cleanKeyName(key: string){
    let cleanedKey = key.toLowerCase();
    if(cleanedKey == 'space') cleanedKey = ' ';
    return cleanedKey;
}