import React, { useEffect } from "react";
import { MenuColumnData } from "../../interfaces/Menu";
import { RowType } from "../../interfaces/Row";
import MenuRow from "../row/MenuRow";
import styles from "./MenuColumn.module.css";

export interface MenuColumnProps extends MenuColumnData {
    index: number[];
}

const MenuColumn: React.FC<MenuColumnProps> = ({ titleRow, rows, index }) => {
    const { text: titleText, price: subtitleText } = titleRow;
    useEffect(() => {
        console.log("title and subtitle: ", `${titleText}, ${subtitleText}`);
        console.log("--------------------------------------------------");
    }, [titleRow]);

    return (
        <div className={styles.con}>
            <MenuRow
                text={titleText}
                price={subtitleText}
                type={RowType.TITLE}
                index={[...index, 0]}
            />
            {rows.map((row, i) => (
                <MenuRow
                    key={`row-${row.text}-${i + 1}`}
                    text={row.text}
                    price={row.price}
                    index={[...index, i + 1]}
                />
            ))}
        </div>
    );
};

export default MenuColumn;
