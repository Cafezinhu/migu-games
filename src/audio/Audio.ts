export type AudioOptions = {
    loop?: boolean;
    volume?: number;
    autoPlay?: boolean;
}
export class Audio extends HTMLAudioElement{
    constructor(url: string, audioOptions?: AudioOptions){
        super();

        const {loop, volume, autoPlay} = audioOptions;

        this.src = url;
        this.autoplay = autoPlay;
        this.loop = loop;
        this.volume = volume ? volume : 1;
        this.style.display = 'none';

        document.body.appendChild(this);
    }
}