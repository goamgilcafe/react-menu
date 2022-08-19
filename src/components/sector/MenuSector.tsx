import React from "react";
import { MenuSectorData } from "../../interfaces/Menu";
import { RowType } from "../../interfaces/Row";
import MenuRow from "../row/MenuRow";

import styles from "./MenuSector.module.css";

export interface MenuSectorProps extends MenuSectorData {
    index: number[];
}

const MenuSector: React.FC<MenuSectorProps> = ({ titleRow, rows, index }) => {
    const { text: titleText, price: subtitleText } = titleRow;
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

export default MenuSector;
