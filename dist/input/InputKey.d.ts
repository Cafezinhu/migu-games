export declare class InputKey {
    isPressed: boolean;
    pressedOnThisFrame: boolean;
    releasedOnThisFrame: boolean;
    status: number;
    constructor();
    update(): void;
    press(): void;
    release(): void;
}
