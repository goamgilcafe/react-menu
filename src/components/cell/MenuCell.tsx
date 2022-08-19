import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    editModeRecoil,
    isEditingRecoil,
    menuDataRecoil,
} from "../../utils/recoils";
import { toast } from "react-toastify";
import { MdCheckBox } from "react-icons/md";
import useLayoutCSSSize from "../../hooks/useLayout";
import { getHorVerPadding } from "../../utils/getPaddingAbouts";
import { EditMode } from "../../interfaces/Edit";
import { MenuCellData } from "../../interfaces/Menu";

import styles from "./MenuCell.module.css";

export interface MenuCellProps extends MenuCellData {
    fontSize: number;
    whiteSpace?:
        | "normal"
        | "pre"
        | "nowrap"
        | "pre-wrap"
        | "pre-line"
        | "break-spaces";

    onClick?: () => void;
    flex?: number;
    align?: string;
    index: number[];
}

const MenuCell: React.FC<MenuCellProps> = ({
    text,
    fontSize,
    onClick,
    flex = 1,
    align = "flex-start",
    whiteSpace,
    index,
}) => {
    const defaultContainerPadding = 15;
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const {
        hor,
        ver,
        padding: conP,
    } = getHorVerPadding(defaultContainerPadding);
    const editMode = useRecoilValue(editModeRecoil);
    const setIsGlobalEditing = useSetRecoilState(isEditingRecoil);
    const [menuData, setMenuData] = useRecoilState(menuDataRecoil);
    const [{ height: rowHeight }, ref] = useLayoutCSSSize({ hor, ver });

    const handleClick = () => {
        if (editMode === EditMode.EDIT) {
            if (isEditing) {
                requestEdit();
            }
            setIsEditing((prev) => !prev);
        } else {
            toast("편집모드를 켜주세요!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
            });
        }
    };

    const requestEdit = () => {
        console.log(`request to backend!: ${index.toString()}`);

        const colIndex = index[0];
        const secIndex = index[1];
        const rowIndex = index[2];
        const celIndex = index[3];

        const targetColumn = menuData[colIndex];
        const targetSectors = targetColumn.sectors;
        const targetSector = targetSectors[secIndex];
        const targetRow =
            rowIndex === 0
                ? targetSector.titleRow
                : targetSector.rows[celIndex];

        const newRow = { ...targetRow };
        if (celIndex === 0) {
            newRow.text = editText;
        } else {
            newRow.price = editText;
        }

        let newRows = [...targetSector.rows];
        if (rowIndex !== 0) {
            newRows[rowIndex - 1] = newRow;
        }

        const newSector =
            rowIndex === 0
                ? { ...targetSector, titleRow: newRow }
                : { ...targetSector, rows: newRows };

        const newSectors = [...targetSectors];
        newSectors[secIndex] = newSector;

        const newColumn = { ...menuData[colIndex], sectors: newSectors };
        const newMenuData = [...menuData];
        newMenuData[colIndex] = newColumn;

        const newMenuDataStr = JSON.stringify(newMenuData);

        setMenuData(newMenuData);
        localStorage.setItem("kr", newMenuDataStr);
    };

    useEffect(() => {
        if (isEditing) {
            console.log("local is editing is: ", isEditing);
            setIsGlobalEditing(() => true);
        } else {
            setIsGlobalEditing(() => false);
        }
    }, [isEditing]);

    return (
        <div
            ref={ref}
            className={styles.con}
            onClick={onClick ?? handleClick}
            style={{
                flex,
                justifyContent: align,
                padding: editMode === EditMode.EDIT && isEditing ? 0 : conP,
            }}
        >
            {editMode === EditMode.EDIT && isEditing ? (
                <div className={styles["edit-con"]}>
                    <input
                        type="text"
                        style={{
                            fontSize,
                            width: "100%",
                            height: rowHeight,
                            paddingLeft: conP,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            const val = e.target.value;
                            setEditText(val);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleClick();
                            }
                        }}
                        value={editText}
                    />
                    <MdCheckBox />
                </div>
            ) : (
                <div
                    style={{
                        whiteSpace,
                        fontSize,
                    }}
                >
                    {editText.split("\\n").map((line, idx) => (
                        <div
                            key={line}
                            style={{
                                marginLeft: idx > 0 ? "20%" : 0,
                                marginTop: idx > 0 ? 10 : 0,
                            }}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuCell;
