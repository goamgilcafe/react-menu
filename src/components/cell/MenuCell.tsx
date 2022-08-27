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
    color?: string;
    lineBreakIndent?: boolean;
}

const MenuCell: React.FC<MenuCellProps> = ({
    text,
    fontSize,
    onClick,
    flex = 1,
    align = "flex-start",
    whiteSpace,
    index,
    color,
    lineBreakIndent = true,
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
    const [{ height: cellHeight }, ref] = useLayoutCSSSize({ hor, ver });
    const paddingTB = editMode === EditMode.EDIT && isEditing ? 0 : conP;

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

        const secIndex = index[0];
        const colIndex = index[1];
        const rowIndex = index[2];
        const celIndex = index[3];

        const targetSector = menuData[secIndex];
        const targetColumns = targetSector.columns;
        const targetColumn = targetColumns[colIndex];
        const targetRow =
            rowIndex === 0
                ? targetColumn.titleRow
                : targetColumn.rows[rowIndex - 1];

        const newRow = { ...targetRow };
        if (celIndex === 0) {
            newRow.text = editText;
        } else {
            newRow.price = editText;
        }

        let newRows = [...targetColumn.rows];
        if (rowIndex !== 0) {
            newRows[rowIndex - 1] = newRow;
        }

        const newColumn =
            rowIndex === 0
                ? { ...targetColumn, titleRow: newRow }
                : { ...targetColumn, rows: newRows };

        const newColumns = [...targetColumns];
        newColumns[colIndex] = newColumn;

        const newSector = { ...menuData[secIndex], columns: newColumns };
        const newMenuData = [...menuData];
        newMenuData[secIndex] = newSector;

        setMenuData(newMenuData);
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
                paddingTop: paddingTB,
                paddingBottom: paddingTB,
            }}
        >
            {editMode === EditMode.EDIT && isEditing ? (
                <div className={styles["edit-con"]}>
                    <input
                        type="text"
                        style={{
                            fontSize,
                            width: "100%",
                            height: cellHeight,
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
                        fontSize,
                    }}
                >
                    {editText.split("\\n").map((line, idx) => (
                        <div
                            key={line}
                            style={{
                                marginLeft:
                                    idx > 0 && index[3] === 0 && lineBreakIndent
                                        ? 20
                                        : 0,
                                marginTop: idx > 0 ? 10 : 0,
                                whiteSpace,
                                color,
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
