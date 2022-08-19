import React from "react";
import { MenuSectorData } from "../../interfaces/Menu";
import MenuColumn from "../row-column/MenuColumn";

import styles from "./MenuSector.module.css";

export interface MenuSectorProps extends MenuSectorData {
    index: number;
}

const MenuSector: React.FC<MenuSectorProps> = ({ columns, index }) => {
    return (
        <div className={styles.con}>
            {columns.map((col, i) => (
                <MenuColumn key={`col-${i}`} {...col} index={[index, i]} />
            ))}
        </div>
    );
};

export default MenuSector;
