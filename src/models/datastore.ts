export interface DatastoreItemDetailParams {
    include_lookups?: boolean,
    use_display_id?: boolean,
    return_number_value?: boolean,
    format?: string,
    include_linked_items?: boolean,
  }
  
export interface DataQuery {
    projectId: string,
    datastoreId: string,
    itemId: string,
    datastoreItemDetailParams?: DatastoreItemDetailParams
  }
  
export interface PropsItemDetail {
    dataQuery: DataQuery
  }

export interface DatastoreItemDetails {
  title: string,
  rev_no: number,
  field_values: any,
  status_list: any,
  status_actions: any,
  item_actions: any,
  status_order: any,
  status_action_order: any,
  item_action_order: any,
}

export interface FieldNameENJP {
  en?: string;
  ja?: string;
}

export interface GetStatuses {
  display_id?: string;
  name?: FieldNameENJP;
  displayed_name?: string;
  status_id?: string;
  sort_id?: number;
  x?: string;
  y?: string;
}

export interface PropDatastoreId {
  datastoreId: string
}

export interface DatastoreGetActions {
  workspace_id?: string;
  project_id?: string;
  datastore_id?: string;
  action_id?: string;
  is_status_action?: boolean;
  display_id?: string;
  operation?: string;
  set_status?: string;
  name?: string;

}