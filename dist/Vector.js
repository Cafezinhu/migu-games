import Victor from "victor";
export class Vector extends Victor {
}
Vector.Zero = () => new Victor(0, 0);
Vector.One = () => new Victor(1, 1);
Vector.Left = () => new Victor(-1, 0);
Vector.Right = () => new Victor(1, 0);
Vector.Up = () => new Victor(0, -1);
Vector.Down = () => new Victor(0, 1);
;
