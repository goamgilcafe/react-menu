import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    editModeRecoil,
    isOpenLoginModalRecoil,
    menuDataRecoil,
} from "../../utils/recoils";
import styles from "./Fab.module.css";
import { AiFillTag, AiOutlineTag } from "react-icons/ai";
import { MdEdit, MdVisibility, MdVpnKey, MdRefresh } from "react-icons/md";
import { EditMode } from "../../interfaces/Edit";
import { menuDataMocksKR } from "../../utils/mocks";

export interface FabProps {
    toolRef: React.RefObject<HTMLDivElement>;
}

const Fab: React.FC<FabProps> = ({ toolRef }) => {
    const [editMode, setEditMode] = useRecoilState(editModeRecoil);
    const setIsOpenLoginModal = useSetRecoilState(isOpenLoginModalRecoil);
    const setMenuData = useSetRecoilState(menuDataRecoil);

    const changeEditMode = () => {
        setEditMode(() =>
            editMode === EditMode.VIEW
                ? EditMode.EDIT
                : editMode === EditMode.EDIT || editMode === EditMode.TAG
                ? EditMode.VIEW
                : EditMode.TAG
        );
    };
    const changeTagMode = () => {
        setEditMode(() =>
            editMode === EditMode.TAG ? EditMode.VIEW : EditMode.TAG
        );
    };
    const openLoginModal = () => {
        setIsOpenLoginModal(() => true);
    };

    const refreshData = () => {
        setMenuData(() => menuDataMocksKR);
    };
    return (
        <div id="tool" className={styles.con} ref={toolRef}>
            <div className={styles.iconcon} onClick={changeTagMode}>
                {editMode === EditMode.TAG ? (
                    <AiOutlineTag className={styles.icon} />
                ) : (
                    <AiFillTag className={styles.icon} />
                )}
            </div>
            <div className={styles.iconcon} onClick={changeEditMode}>
                {editMode === EditMode.EDIT ? (
                    <MdVisibility className={styles.icon} />
                ) : (
                    <MdEdit className={styles.icon} />
                )}
            </div>
            <div className={styles.iconcon} onClick={openLoginModal}>
                <MdVpnKey className={styles.icon} />
            </div>
            <div className={styles.iconcon} onClick={refreshData}>
                <MdRefresh className={styles.icon} />
            </div>
        </div>
    );
};

export default Fab;
