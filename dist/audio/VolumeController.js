let generalVolume = 1;
const audioMap = new Map();
export class VolumeController {
    static addAudioToTag(audio, tag) {
        const audioTag = audioMap.get(tag);
        if (audioTag) {
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
    static setTagVolume(volume, tag) {
        const audioTag = audioMap.get(tag);
        if (audioTag) {
            audioTag.currentVolume = volume;
            updateAudioTagVolume(audioTag, volume);
        }
    }
    static getTagVolume(tag) {
        const audioTag = audioMap.get(tag);
        if (audioTag) {
            return audioTag.currentVolume;
        }
        return undefined;
    }
    static setGeneralVolume(volume) {
        generalVolume = volume;
        audioMap.forEach(audioTag => {
            updateAudioTagVolume(audioTag, audioTag.currentVolume);
        });
    }
    static getGeneralVolume() {
        return generalVolume;
    }
}
function updateAudioTagVolume(audioTag, volume) {
    audioTag.audioList.forEach(audio => {
        audio.volume = generalVolume * audio.baseVolume * volume;
    });
}
