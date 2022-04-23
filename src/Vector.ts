import Victor from "victor";
export class Vector extends Victor {
    static Zero = () => new Victor(0,0);
    static One = () => new Victor(1, 1);
    static Left = () => new Victor(-1, 0);
    static Right = () => new Victor(1, 0);
    static Up = () => new Victor(0, -1);
    static Down = () => new Victor(0, 1);
};