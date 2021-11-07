
import { gql } from "@apollo/client";
export const GET_DATASTORESTATUS = gql`
  query Query($datastoreId: String!) {
    datastoreGetStatuses(datastoreId: $datastoreId) {
      display_id
      name {
      en
      ja
      }
      displayed_name
      status_id
      sort_id
      x
      y
    }
  }`;

export const GET_DATASTOREACTION = gql`
  query Query($datastoreId: String!) {
    datastoreGetActions(datastoreId: $datastoreId) {
      workspace_id
      project_id
      datastore_id
      action_id
      is_status_action
      display_id
      operation
      set_status
      name
    }
  }`;