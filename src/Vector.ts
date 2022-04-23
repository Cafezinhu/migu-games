import Victor from "victor";

export type Vector = Victor;
export const Vector = {
    ...Victor,
    Zero: () => new Victor(0, 0),
    One: () => new Victor(1, 1),
    Left: () => new Victor(-1, 0),
    Right: () => new Victor(1, 0),
    Up: () => new Victor(0, -1),
    Down: () => new Victor(0, 1)
};