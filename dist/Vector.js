import Victor from "victor";
export class Vector extends Victor {
}
Vector.Zero = () => new Vector(0, 0);
Vector.One = () => new Vector(1, 1);
Vector.Left = () => new Vector(-1, 0);
Vector.Right = () => new Vector(1, 0);
Vector.Up = () => new Vector(0, -1);
Vector.Down = () => new Vector(0, 1);
;
