import { GameAudio } from "./GameAudio";

let generalVolume = 1;

type AudioTag = {
    audioList: GameAudio[];
    currentVolume: number;
}

const audioMap: Map<string, AudioTag> = new Map();

export class VolumeController
{
    static createAudio(src: string, tag: string, baseVolume = 1)
    {
        const gameAudio = new GameAudio(src, baseVolume);

        VolumeController.addAudioToTag(gameAudio, tag);

        return gameAudio;
    }
    
    static addAudioToTag(audio: GameAudio, tag: string){
        const audioTag = audioMap.get(tag);
        if(audioTag){
            audio.volume = audioTag.currentVolume * generalVolume * audio.baseVolume;
            audioTag.audioList.push(audio);
            return;
        }

        audio.volume = generalVolume * audio.baseVolume;
        
        audioMap.set(tag, {
            audioList: [audio],
            currentVolume: 1
        });
    }

    static setTagVolume(volume: number, tag: string){
        const audioTag = audioMap.get(tag);
        if(audioTag){
            audioTag.currentVolume = volume;
            updateAudioTagVolume(audioTag, volume);
        }
    }

    static getTagVolume(tag: string): number | undefined{
        const audioTag = audioMap.get(tag);
        if(audioTag){
            return audioTag.currentVolume;
        }
        return undefined;
    }

    static setGeneralVolume(volume: number){
        generalVolume = volume;
        audioMap.forEach(audioTag => {
            updateAudioTagVolume(audioTag, audioTag.currentVolume);
        });
    }

    static getGeneralVolume(): number{
        return generalVolume;
    }
}

function updateAudioTagVolume(audioTag: AudioTag, volume: number){
    audioTag.audioList.forEach(audio => {
        audio.volume = generalVolume * audio.baseVolume * volume;
    });
}