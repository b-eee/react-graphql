export interface PropsGetItem {
    data: DatastoreItems
}




export interface DatastoreItems {
    items?: any,
    totalItems?: number
}

export interface DatastoreCreateNewItemRes {
    error?: any,
    history_id?: string,
    item?: any,
    item_id?: string,
}
