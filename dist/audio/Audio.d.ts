export declare type AudioOptions = {
    loop?: boolean;
    volume?: number;
    autoplay?: boolean;
};
export declare class Audio extends HTMLAudioElement {
    constructor(url: string, audioOptions?: AudioOptions);
}
