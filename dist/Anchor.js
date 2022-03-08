import { Vector } from "./Vector";
export var Anchor;
(function (Anchor) {
    Anchor[Anchor["TopLeft"] = 0] = "TopLeft";
    Anchor[Anchor["Top"] = 1] = "Top";
    Anchor[Anchor["TopRight"] = 2] = "TopRight";
    Anchor[Anchor["Left"] = 3] = "Left";
    Anchor[Anchor["Center"] = 4] = "Center";
    Anchor[Anchor["Right"] = 5] = "Right";
    Anchor[Anchor["BottomLeft"] = 6] = "BottomLeft";
    Anchor[Anchor["Bottom"] = 7] = "Bottom";
    Anchor[Anchor["BottomRight"] = 8] = "BottomRight";
})(Anchor || (Anchor = {}));
;
export function getAnchorPoint(rectangle, anchor) {
    const points = [
        new Vector(0, 0),
        new Vector(rectangle.width / 2, 0),
        new Vector(rectangle.width, 0),
        new Vector(0, rectangle.height / 2),
        new Vector(rectangle.width / 2, rectangle.height / 2),
        new Vector(rectangle.width, rectangle.height / 2),
        new Vector(0, rectangle.height),
        new Vector(rectangle.width / 2, rectangle.height),
        new Vector(rectangle.width, rectangle.height)
    ];
    return points[anchor];
}
