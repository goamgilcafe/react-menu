import React from "react";
import { MenuSectorData } from "../../interfaces/Menu";
import MenuSector from "../rowbig/MenuSector";
import styles from "./MenuContainer.module.css";

export interface MenuContainerProps {
    menuData: MenuSectorData[];
}

const MenuContainer: React.FC<MenuContainerProps> = ({ menuData }) => {
    return (
        <div className={styles.con}>
            {menuData.map((sec, i) => (
                <MenuSector key={`sec-${i}`} {...sec} index={i} />
            ))}
        </div>
    );
};

export default MenuContainer;
