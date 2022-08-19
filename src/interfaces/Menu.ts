export interface MenuCellData {
    text: string;
}

export interface MenuRowData {
    text: string;
    price: string;
}

export interface MenuSectorData {
    titleRow: MenuRowData;
    rows: MenuRowData[];
}

export interface MenuColumnData {
    sectors: MenuSectorData[];
}
