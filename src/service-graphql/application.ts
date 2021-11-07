import { gql } from "@apollo/client";
  
export const GET_APPLICATIONDATASTORE = gql`
    query Query($workspaceId: String!) {
      getApplicationAndDataStore(workspaceId: $workspaceId) {
        application_id
        name
        display_id
        datastores {
          name
          datastore_id
        }
      }
    }`;

export const ADD_APPLICATION = gql`
  mutation DatastoreGetDatastoreItemsMutation($createProjectParams: CreateProjectParams) {
    applicationCreateProject(createProjectParams: $createProjectParams) {
      project_id
    }
  }`;

