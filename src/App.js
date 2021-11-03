import './App.css';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

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

function GetWorkspaces() {
  const { loading, error, data } = useQuery(GET_WORKSPACE);
  console.log(loading, error, data)
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
  return data.workspaces.workspaces.map((workspace, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{workspace.workspace_id}</td>
          <td>{workspace.workspace_name}</td>
        </tr>
      );
  })
}

function AddWorkspace() {
  let input;
  const [addWorkspace, { data, loading, error }] = useMutation(ADD_WORKSPACE);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addWorkspace({ variables: { createWorkSpaceInput: {
            name: input.value
          }} });
          input.value = '';
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
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="title-query">Query: Get Workspaces</div>
        <table className="table-content">
          <tbody>
          <tr>
            <td>index</td>
            <td>workspace_id</td>
            <td>workspace_name</td>
            </tr>
          <GetWorkspaces></GetWorkspaces>
          </tbody>
        </table>
        <div className="title-mutation">Mutation: Create Workspaces</div>
        <AddWorkspace></AddWorkspace>
      </div>
    </div>
  );
}

export default App;
