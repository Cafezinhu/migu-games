import './style.css';
import { Engine, Sprite } from '../../../src';
import {loadSprites} from '../../../node_modules/migu-games/dist/loadSprites';

const engine = new Engine({onComplete});
engine.appendToDocument();

//@ts-ignore
function onComplete(){
    //@ts-ignore
    new Sprite(engine, {texture: engine.resources.platformchar_idle.texture});
    console.log(window.innerWidth);
    
}

loadSprites(engine);