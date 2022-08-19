import React from "react";
import { MenuColumnData } from "../../interfaces/Menu";
import MenuColumn from "../t-column/MenuColumn";
import styles from "./MenuContainer.module.css";

export interface MenuContainerProps {
    menuData: MenuColumnData[];
}

const MenuContainer: React.FC<MenuContainerProps> = ({ menuData }) => {
    return (
        <div className={styles.con}>
            {menuData.map((col, i) => (
                <MenuColumn key={`col-${i}`} {...col} index={i} />
            ))}
        </div>
    );
};

export default MenuContainer;
