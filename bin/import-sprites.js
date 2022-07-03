#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import recursive from 'recursive-readdir';

const input = process.argv[process.argv.length - 1];
const inputPath = path.join(process.cwd(), input);
console.log('Reading files...');
recursive(inputPath, (err, files) => {
    let sprites = {};
    files.forEach(file => {
        if(!file.endsWith('.png')  
            && !file.endsWith('.jpg')
            && !file.endsWith('.jpeg')
            && !file.endsWith('.gif')
            && !file.endsWith('.bmp')
            && !file.endsWith('.webp')) return;

        let name = file.replace(`${inputPath}\\`, '').toLowerCase()
            .replace('.png', '')
            .replace('.jpg', '')
            .replace('.jpeg', '')
            .replace('.gif', '')
            .replace('.bmp', '')
            .replace('.webp', '');
        let nextCap = false;
        let finalName = '';
        for(let char of name.split('')){
            if(char == '\\' || char == ' '){
                nextCap = true;
            }else{
                if(nextCap){
                    nextCap = false;
                    finalName = `${finalName}${char.toUpperCase()}`;
                }else{
                    finalName = `${finalName}${char}`;
                }
            }
        }
        sprites[finalName] = file;
        console.log(finalName);
    });

    console.log('Writing js...');
    
    fs.writeFileSync(path.join(process.cwd(), 'node_modules', 'migu-games', 'dist', 'loadSprites.js'), `const sprites = ${JSON.stringify(sprites)}
export function loadSprites(engine){
    Object.keys(sprites).forEach(sprite => {
        engine.addResource(sprite, sprites[sprite]);
    });
    engine.loadResources();
}`);

    console.log('Writing .d.ts...');

    fs.writeFileSync(path.join(process.cwd(), 'node_modules', 'migu-games', 'dist', 'loadSprites.d.ts'), `import { Engine } from "./Engine";
import { LoaderResource } from 'pixi.js';
export declare function loadSprites(engine: Engine): void;
export declare type Resources = {${Object.keys(sprites).map(sprite => `'${sprite}': LoaderResource`)}}`);
});