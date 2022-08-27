import React, { useEffect } from "react";
import useLayoutCSSSize from "../../hooks/useLayout";
import { MenuRowData } from "../../interfaces/Menu";
import { RowType } from "../../interfaces/Row";
import { TopBottomLeftRight } from "../../interfaces/Size";
import { getHorVerPadding } from "../../utils/getPaddingAbouts";
import MenuCell from "../cell/MenuCell";
import styles from "./MenuRow.module.css";

export interface MenuRowProps extends MenuRowData {
    p?: number | TopBottomLeftRight;
    flexRatio?: { text: number; price: number };
    type?: RowType;
    index: number[];
}

const MenuRow: React.FC<MenuRowProps> = ({
    text,
    price,
    isTitle = false,
    lineBreakIndent,
    p = 0,
    flexRatio = { text: 3, price: 1.5 },
    type = RowType.ITEM,
    index,
}) => {
    const { hor, ver, padding } = getHorVerPadding(p);
    const [{ width: rowWidth }, ref] = useLayoutCSSSize({ hor, ver });
    const fontSize = rowWidth / (type === RowType.ITEM ? 18 : 12);
    const pricefontSize = rowWidth / 18;

    useEffect(() => {
        if (type === RowType.TITLE) {
            console.log("title text is ", text);
        }
    }, [type]);

    return (
        <div className={styles[`con-${type}`]} ref={ref} style={{ padding }}>
            <MenuCell
                text={text}
                fontSize={fontSize}
                flex={flexRatio.text}
                index={[...index, 0]}
                color={
                    isTitle || type === RowType.TITLE ? "#00b7c4" : undefined
                }
                lineBreakIndent={lineBreakIndent}
                whiteSpace="nowrap"
            />
            <MenuCell
                text={price}
                fontSize={pricefontSize}
                flex={flexRatio.price}
                align="center"
                index={[...index, 1]}
            />
        </div>
    );
};

export default MenuRow;
