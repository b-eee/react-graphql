import { gql } from "@apollo/client";
  
export const GET_ITEMS = gql`
  mutation DatastoreGetDatastoreItemsMutation($getItemsParameters: GetItemsParameters!, $datastoreId: String!, $projectId: String) {
    datastoreGetDatastoreItems(getItemsParameters: $getItemsParameters, datastoreId: $datastoreId, projectId: $projectId) {
      items
      totalItems
    }
  }`;

export const ADD_ITEM = gql`
  mutation DatastoreGetDatastoreItemsMutation($newItemActionParameters: NewItemActionParameters!, $datastoreId: String!, $projectId: String!) {
    datastoreCreateNewItem(newItemActionParameters: $newItemActionParameters, datastoreId: $datastoreId, projectId: $projectId) {
      error
      history_id
      item
      item_id
    }
  }`;

  export const GET_DATASTOREITEMDETAIL = gql`
  query Query($itemId: String!, $datastoreId: String!, $projectId: String, $datastoreItemDetailParams: DatastoreItemDetailParams) {
    getDatastoreItemDetails(itemId: $itemId, datastoreId: $datastoreId, projectId: $projectId, datastoreItemDetailParams: $datastoreItemDetailParams) {
      title
      rev_no
      field_values
      status_list
      status_actions
      item_actions
      status_order
      status_action_order
      item_action_order
    }
  }`;

