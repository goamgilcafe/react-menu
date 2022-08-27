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
            <MenuRow {...titleRow} type={RowType.TITLE} index={[...index, 0]} />
            {rows.map((row, i) => (
                <MenuRow
                    key={`row-${row.text}-${i + 1}`}
                    index={[...index, i + 1]}
                    {...row}
                />
            ))}
        </div>
    );
};

export default MenuColumn;
