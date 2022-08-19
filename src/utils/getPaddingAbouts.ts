import { TopBottomLeftRight } from "../interfaces/Size";
export const getPaddingString = (p: TopBottomLeftRight) => {
    return `${p.top ?? 0}px ${p.right ?? 0}px ${p.bottom ?? 0}px ${
        p.left ?? 0
    }px`;
};

export const getHorVerPadding = (p: TopBottomLeftRight | number) => {
    return typeof p === "number"
        ? { hor: p, ver: p, padding: p }
        : {
              hor: (p.left ?? 0) + (p.right ?? 0),
              ver: (p.top ?? 0) + (p.bottom ?? 0),
              padding: getPaddingString(p),
          };
};
