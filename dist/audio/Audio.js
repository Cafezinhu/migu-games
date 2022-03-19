export class Audio extends HTMLAudioElement {
    constructor(url, audioOptions) {
        super();
        const { loop, volume, autoplay } = audioOptions;
        this.src = url;
        this.autoplay = autoplay;
        this.loop = loop;
        this.volume = volume ? volume : 1;
        this.style.display = 'none';
        document.body.appendChild(this);
    }
}
