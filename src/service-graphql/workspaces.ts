import {
    gql,
} from "@apollo/client";

export const GET_WORKSPACE = gql`
    query Query {
        workspaces {
            workspaces {
                workspace_name
                workspace_id
            }
        }
    }`;

export const ADD_WORKSPACE = gql`
    mutation Mutation($createWorkSpaceInput: CreateWorkSpaceInput!) {
        createWorkspace(createWorkSpaceInput: $createWorkSpaceInput) {
            w_id
        }
    }`;