import { atom } from "recoil";
import { EditMode } from "../interfaces/Edit";
import { MenuColumnData } from "../interfaces/Menu";

export const editModeRecoil = atom({
    key: "editModeRecoil",
    default: EditMode.VIEW,
});

export const isOpenLoginModalRecoil = atom({
    key: "isOpenLoginModalRecoil",
    default: false,
});

/**
 * MenuColumn 컴포넌트에 디펜던시 걸려있는 타입이므로 위계가 낮은 다른 인터페이스를 같은 모듈안에 위치시키지 말것.
 */
export type MenuData = MenuColumnData[];

export const menuDataRecoil = atom<MenuData>({
    key: "menuDataRecoil",
    default: [],
});

export const isEditingRecoil = atom({
    key: "isEditingRecoil",
    default: false,
});
