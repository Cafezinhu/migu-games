#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import recursive from 'recursive-readdir';

const input = process.argv[process.argv.length - 1];
const inputPath = path.join(process.cwd(), input);
recursive(inputPath, (err, files) => {
    let sprites = {};
    files.forEach(file => {
        if(!file.endsWith('.png')  
            && !file.endsWith('.jpg')
            && !file.endsWith('.jpeg')
            && !file.endsWith('.gif')
            && !file.endsWith('.bmp')
            && !file.endsWith('.webp')) return;

        let name = file.replace(`${inputPath}\\`, '').replace(`${inputPath}/`, '').toLowerCase()
            .replace('.png', '')
            .replace('.jpg', '')
            .replace('.jpeg', '')
            .replace('.gif', '')
            .replace('.bmp', '')
            .replace('.webp', '');
        let nextCap = false;
        let finalName = '';
        for(let char of name.split('')){
            if(char == '\\' || char == ' ' || char == '/' || char == '-'){
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
        sprites[finalName] = file.replace(`${process.cwd()}\\`, '').replace(`${process.cwd()}/`, '').replace(/\\/g, '\\\\');
    });

    fs.writeFileSync(path.join(process.cwd(), 'node_modules', 'migu-games', 'dist', 'loadSprites.js'), `
${Object.keys(sprites).length < 2 ? `import ${Object.keys(sprites)[0]} from '../../../${Object.values(sprites)[0]}';` : 
Object.keys(sprites).reduce((acc, sprite, index) => {
    if(index == 1 || index == 0) return `import ${acc} from '../../../${sprites[acc]}';\nimport ${sprite} from '../../../${sprites[sprite]}';`;
    return `${acc}\nimport ${sprite} from '../../../${sprites[sprite]}';`;
})}

import { Texture } from 'pixi.js';

export const manifest = {
    bundles: [
        {
            name: 'assets',
            assets: [
                ${Object.keys(sprites).map(sprite => `{name: '${sprite}', srcs: ${sprite}}`).reduce((acc, sprite) => `${acc}, ${sprite}`)}
            ]
        }
    ]
};`);

    fs.writeFileSync(path.join(process.cwd(), 'node_modules', 'migu-games', 'dist', 'loadSprites.d.ts'), `import { Engine } from "./Engine";
import { Texture } from 'pixi.js';
export declare function loadSprites(engine: Engine): void;
export declare type Resources = {${Object.keys(sprites).map(sprite => `'${sprite}': Texture`)}}`);
});