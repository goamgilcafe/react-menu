import React from "react";
import { MenuColumnData } from "../../interfaces/Menu";
import MenuSector from "../sector/MenuSector";
import styles from "./MenuColumn.module.css";

export interface MenuColumnProps extends MenuColumnData {
    index: number;
}

const MenuColumn: React.FC<MenuColumnProps> = ({ sectors, index }) => {
    return (
        <div className={styles.con}>
            {sectors.map((sector, i) => (
                <MenuSector key={`sec-${i}`} {...sector} index={[index, i]} />
            ))}
        </div>
    );
};

export default MenuColumn;
