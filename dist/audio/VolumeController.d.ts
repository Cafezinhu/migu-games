import { MiguAudio } from "./MiguAudio";
export declare class VolumeController {
    static addAudioToTag(audio: MiguAudio, tag: string): void;
    static setTagVolume(volume: number, tag: string): void;
    static getTagVolume(tag: string): number | undefined;
    static setGeneralVolume(volume: number): void;
    static getGeneralVolume(): number;
}
