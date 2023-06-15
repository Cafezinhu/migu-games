export declare class InputKey {
    isPressed: boolean;
    pressedOnThisFrame: boolean;
    releasedOnThisFrame: boolean;
    status: number;
    value: number;
    constructor();
    update(): void;
    press(value: number): void;
    release(): void;
}
