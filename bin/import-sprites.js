#!/usr/bin/env node
import fs from 'fs';
import recursive from 'recursive-readdir';

const input = process.argv[process.argv.length - 2];
const output = process.argv[process.argv.length - 1];
recursive(input, (err, files) => {
    let sprites = {};
    files.forEach(file => {
        if(!file.endsWith('.png')  
            && !file.endsWith('.jpg')
            && !file.endsWith('.jpeg')
            && !file.endsWith('.gif')
            && !file.endsWith('.bmp')
            && !file.endsWith('.webp')) return;

        let name = file.replace(`${input}\\`, '').toLowerCase()
            .replace('.png', '')
            .replace('.jpg', '')
            .replace('.jpeg', '')
            .replace('.gif', '')
            .replace('.bmp', '')
            .replace('.webp', '');
        let nextCap = false;
        let finalName = '';
        for(let char of name.split('')){
            if(char == '\\'){
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
    });
    
    fs.writeFileSync(output, `const sprites = ${JSON.stringify(sprites)}
export function loadSprites(engine){
    Object.keys(sprites).forEach(sprite => {
        engine.addResource(sprite, sprites[sprite]);
    });
    engine.loadResources();
}
`);
});