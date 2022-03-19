export type AudioOptions = {
    loop?: boolean;
    volume?: number;
    autoplay?: boolean;
}
export class Audio extends HTMLAudioElement{
    constructor(url: string, audioOptions?: AudioOptions){
        super();

        const {loop, volume, autoplay} = audioOptions;

        this.src = url;
        this.autoplay = autoplay;
        this.loop = loop;
        this.volume = volume ? volume : 1;
        this.style.display = 'none';

        document.body.appendChild(this);
    }
}