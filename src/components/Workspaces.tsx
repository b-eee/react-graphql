import React from 'react';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

import { WorkSpaceModel } from '../models/workspace'
const GET_WORKSPACE = gql`{
workspaces {
  current_workspace_id
  workspaces {
    workspace_id
    workspace_name
  }
}
}`;

const ADD_WORKSPACE = gql`
  mutation Mutation($createWorkSpaceInput: CreateWorkSpaceInput!) {
  createWorkspace(createWorkSpaceInput: $createWorkSpaceInput) {
    w_id
  }
}
`;

type WId = {
  w_id: string
}

const GetWorkspaces:  React.FC = () => {
  const { loading, error, data } = useQuery(GET_WORKSPACE);
  console.log(loading, error, data)
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
    return data.workspaces.workspaces.map((workspace: WorkSpaceModel, index: number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{workspace.workspace_id}</td>
          <td>{workspace.workspace_name}</td>
        </tr>
      );
  })
}

const AddWorkspace: any = () => {
  let input: HTMLInputElement|null;
  const [addWorkspace, { data, loading, error }] = useMutation(ADD_WORKSPACE);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  const workspaceRes: WId = data?.createWorkspace
  return ( 
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addWorkspace({ variables: { createWorkSpaceInput: {
            name: input?.value
          }} });
        }}
      >
        <input
          placeholder="input new name workspace"
          ref={node => {
            input = node;
          }}
        />
        <button className="button-mutation" type="submit">Add Workspaces</button>
      </form>
      {data && workspaceRes&&
        <div>
          <div>Response: {JSON.stringify(workspaceRes)}</div>
        </div>
      }
    </div>
  );
}


function WorkSpaces() {
  return (
    <>
        <div className="title-query">Query: Get Workspaces</div>
        <table className="table-content">
          <thead>

          <tr>
            <th>index</th>
            <th>workspace_id</th>
            <th>workspace_name</th>
          </tr>
          </thead>
          <tbody>
          <GetWorkspaces></GetWorkspaces>
          </tbody>
        </table>
        <div className="title-mutation">Mutation: Create Workspaces</div>
        <AddWorkspace></AddWorkspace>
    </>
  );
}

export default WorkSpaces;
