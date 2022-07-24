import Matter from "matter-js";
import { Application, Loader } from "pixi.js";
import { Camera } from "./Camera";
import { Input } from "./Input";
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
        this.loader.onLoad.add(() => {
            if (this.onLoad)
                this.onLoad();
        });
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
        this.physicsEngine = Matter.Engine.create();
        const physicsRunner = Matter.Runner.create();
        Matter.Events.on(this.physicsEngine, 'afterUpdate', () => this.onPhysicsUpdate());
        Matter.Runner.run(physicsRunner, this.physicsEngine);
        Matter.Events.on(this.physicsEngine, 'collisionStart', (e) => this.onCollision(e));
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
        this.gameObjects.forEach(gameObject => {
            const physicsBody = gameObject.physicsBody;
            if (!physicsBody)
                return;
            gameObject.x = physicsBody.position.x;
            gameObject.y = physicsBody.position.y;
            gameObject.angle = physicsBody.angle;
        });
    }
    onCollision(e) {
        e.pairs.forEach(pair => {
            let gameObjectA = null;
            for (let gameObject of this.gameObjects) {
                if (pair.bodyA == gameObject.physicsBody) {
                    gameObjectA = gameObject;
                    break;
                }
            }
            let gameObjectB = null;
            for (let gameObject of this.gameObjects) {
                if (pair.bodyB == gameObject.physicsBody) {
                    gameObjectB = gameObject;
                    break;
                }
            }
            if (gameObjectA) {
                gameObjectA.onCollision(gameObjectB, pair.contacts);
            }
            if (gameObjectB) {
                gameObjectB.onCollision(gameObjectA, pair.contacts);
            }
        });
    }
}
