export type DatastoreItemDetailParams = {
    include_lookups: boolean;
    use_display_id: boolean;
    return_number_value: boolean;
    format: string;
    include_linked_items: boolean;
  }
  
export   type DataQuery = {
    projectId: string,
    datastoreId: string,
    itemId: string,
    datastoreItemDetailParams: DatastoreItemDetailParams
  }
  
export   type PropsItemDetail = {
    dataQuery: DataQuery
  }