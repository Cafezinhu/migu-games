export class MiguAudio extends Audio{
    baseVolume: number;

    constructor(src: string, baseVolume?: number){
        super(src);
        if(baseVolume) {
            this.baseVolume = baseVolume;
            this.volume = baseVolume;
            return;
        }

        this.baseVolume = 1;
    }
}