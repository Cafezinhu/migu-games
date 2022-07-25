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
import { Input } from "./Input";
import { setPhysics } from "./Physics";
import { Vector } from "./Vector";
export class Engine {
    constructor(options) {
        this.pixiApplication = new Application(Object.assign(Object.assign({}, options), { resizeTo: window }));
        this.view = this.pixiApplication.view;
        this.stage = this.pixiApplication.stage;
        this.autoResize = options.autoResize;
        this.loader = new Loader();
        this.onLoad = options.onLoad;
        this.onProgress = options.onProgress;
        this.onComplete = options.onComplete;
        this.gameObjects = [];
        this.loader.onLoad.add(() => __awaiter(this, void 0, void 0, function* () {
            const physics = yield import('@dimforge/rapier2d');
            setPhysics(physics);
            let gravity = options.gravity ? new Vector(options.gravity.x, -options.gravity.y) : new Vector(0, -9.81);
            this.physicsWorld = new physics.World(gravity);
            this.physicsEventQueue = new physics.EventQueue(true);
            this.physicsEventQueue.drainCollisionEvents((handle1, handle2, started) => {
                this.onCollision(handle1, handle2, started);
            });
            clearInterval(this.physicsInterval);
            this.physicsInterval = setInterval(() => {
                this.onPhysicsUpdate();
            });
            if (this.onLoad)
                this.onLoad();
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
        this.physicsWorld.step();
        this.gameObjects.forEach(gameObject => {
            if (!gameObject.rigidBody)
                return;
            const pos = gameObject.rigidBody.translation();
            gameObject.position = new Vector(pos.x, -pos.y);
            gameObject.rotation = gameObject.rigidBody.rotation();
        });
    }
    onCollision(handle1, handle2, started) {
        let gameObjectA = null;
        for (let gameObject of this.gameObjects) {
            if (handle1 == gameObject.collider.handle) {
                gameObjectA = gameObject;
                break;
            }
        }
        let gameObjectB = null;
        for (let gameObject of this.gameObjects) {
            if (handle2 == gameObject.collider.handle) {
                gameObjectB = gameObject;
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
