import Victor from "victor";
export class Vector extends Victor {
    static Zero = () => new Vector(0,0);
    static One = () => new Vector(1, 1);
    static Left = () => new Vector(-1, 0);
    static Right = () => new Vector(1, 0);
    static Up = () => new Vector(0, -1);
    static Down = () => new Vector(0, 1);
};