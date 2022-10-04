var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Application, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { Input } from "./input/Input";
import { loadSprites } from "./loadSprites";
import { Vector } from "./Vector";
import { PhysicsPlugin } from "./physics/Physics";
export class Engine {
    constructor(options) {
        if (!options.resizeTo)
            options.resizeTo = window;
        this.pixiApplication = new Application(Object.assign({}, options));
        this.view = this.pixiApplication.view;
        this.view.addEventListener('contextmenu', e => e.preventDefault());
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onProgress = options.onProgress;
        this.gameObjects = [];
        this.loader.onComplete.add(() => __awaiter(this, void 0, void 0, function* () {
            yield PhysicsPlugin.init();
            let gravity = options.gravity ? new PhysicsPlugin.Vector2(options.gravity.x, options.gravity.y) : new PhysicsPlugin.Vector2(0, 9.81);
            this.physicsWorld = new PhysicsPlugin.World(gravity);
            this.physicsEventQueue = new PhysicsPlugin.EventQueue(true);
            clearInterval(this.physicsInterval);
            this.physicsInterval = setInterval(() => {
                this.onPhysicsUpdate();
            });
            this.pixiApplication.ticker.add(delta => this.update(delta));
            if (options.onComplete)
                options.onComplete();
        }));
        this.loader.onProgress.add((loader) => {
            if (this.onProgress)
                this.onProgress(loader.progress);
        });
        this.baseResolution = options.baseResolution ? options.baseResolution : new Vector(window.innerWidth, window.innerHeight);
        this.camera = new Camera({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: this.baseResolution.x,
            worldHeight: this.baseResolution.y,
            interaction: this.pixiApplication.renderer.plugins.interaction
        });
        this.camera.moveCenter(0, 0);
        this.stage.addChild(this.camera);
        if (options.sideToPreserve) {
            this.sideToPreserve = options.sideToPreserve;
        }
        else {
            this.sideToPreserve = 'width';
        }
        if (!options.disableInputSystem) {
            this.inputSystem = new Input(this);
        }
        window.addEventListener('resize', () => {
            const cameraPos = this.camera.center;
            this.pixiApplication.resize();
            this.camera.setZoom(this.sideToPreserve == 'width' ?
                window.innerWidth / this.baseResolution.x :
                window.innerHeight / this.baseResolution.y, true);
            this.camera.resize();
            this.camera.moveCenter(cameraPos.x, cameraPos.y);
        });
        loadSprites(this);
    }
    static create(options) {
        Engine.instance = new Engine(options);
        Engine.instance.appendToDocument();
        return Engine.instance;
    }
    update(delta) {
        Array.from(Input.keys.values()).forEach(key => {
            key.update();
        });
        this.gameObjects.forEach(gameObject => {
            //@ts-ignore
            if (gameObject.update)
                gameObject.update(delta);
        });
    }
    appendToDocument() {
        document.body.appendChild(this.view);
    }
    addResource(name, url) {
        this.loader.add(name, url);
    }
    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
    removeGameObject(gameObject) {
        this.gameObjects = this.gameObjects.filter(g => {
            return g != gameObject;
        });
    }
    loadResources() {
        this.loader.load((l, resources) => {
            this.resources = resources;
            if (this.onComplete)
                this.onComplete();
        });
    }
    onPhysicsUpdate() {
        this.physicsWorld.step(this.physicsEventQueue);
        this.physicsEventQueue.drainCollisionEvents((handle1, handle2, started) => {
            this.onCollision(handle1, handle2, started);
        });
        this.gameObjects.forEach((gameObject) => {
            if (!gameObject.rigidBody)
                return;
            const pos = gameObject.rigidBody.translation();
            gameObject.position = new Vector(pos.x, pos.y);
            gameObject.rotation = gameObject.rigidBody.rotation();
        });
    }
    onCollision(handle1, handle2, started) {
        let gameObjectA = null;
        for (const gameObject of this.gameObjects) {
            const rigidBody = gameObject;
            if (!rigidBody.rigidBody)
                continue;
            if (handle1 == rigidBody.collider.handle) {
                gameObjectA = rigidBody;
                break;
            }
        }
        let gameObjectB = null;
        for (const gameObject of this.gameObjects) {
            const rigidBody = gameObject;
            if (!rigidBody.rigidBody)
                continue;
            if (handle2 == rigidBody.collider.handle) {
                gameObjectB = rigidBody;
                break;
            }
        }
        const pair = gameObjectA.collider.contactCollider(gameObjectB.collider, 1);
        const contacts = [
            new Vector(pair.point1.x, -pair.point1.y),
            new Vector(pair.point2.x, -pair.point2.y)
        ];
        gameObjectA.onCollision(gameObjectB, contacts, started);
        gameObjectB.onCollision(gameObjectA, contacts, started);
    }
}
