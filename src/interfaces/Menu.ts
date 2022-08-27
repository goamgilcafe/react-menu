export interface MenuCellData {
    text: string;
}

export interface MenuRowData {
    text: string;
    price: string;
    isTitle?: boolean;
    lineBreakIndent?: boolean;
}

export interface MenuColumnData {
    titleRow: MenuRowData;
    rows: MenuRowData[];
}

export interface MenuSectorData {
    columns: MenuColumnData[];
}
