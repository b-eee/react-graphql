import React from 'react';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";


const GET_APPLICATIONDATASTORE = gql`
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
  }
`;
const ADD_APPLICATION = gql`
mutation DatastoreGetDatastoreItemsMutation($createProjectParams: CreateProjectParams) {
  applicationCreateProject(createProjectParams: $createProjectParams) {
    project_id
  }
}
`;

function GetApplicationAndDatastore(props: any ) {
  const workspaceId = props.workspaceId
  const  { data, loading, error } = useQuery(GET_APPLICATIONDATASTORE, 
    {
      variables: { workspaceId },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
  return data.getApplicationAndDataStore.map((appDs :any, index: number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(appDs)}</td>
        </tr>
      );
  })

}

const AddApplication: any = () =>{
  let tp_id: HTMLInputElement|null;
  let name: HTMLInputElement|null;
  const [addApplication, { data, loading, error }] = useMutation(ADD_APPLICATION);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  const applicationRes = data?.applicationCreateProject
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addApplication({ variables: { createProjectParams: {
            tp_id: tp_id?.value,
            name: name?.value ? JSON.parse(name.value) :''
          }} });
        }}
      >
        <div className="body-input">
          <div>Template ID:</div>
          <div className="input-field"><input
            placeholder="input template ID"
            ref={node => {
              tp_id = node;
            }}
          /></div>
        </div>
        <div className="body-input">
          <div>Name: {JSON.stringify({'name1':'value1',})}</div>
          <div className="input-field type-json">
            <input
              placeholder="type JSON:{'name':'value1',..}"
              ref={node => {
                name = node;
              }}
            />
          </div>
        </div>
        <button className="button-mutation" type="submit">Add Application</button>
      </form>
      {data && applicationRes&&
        <div>
          <div>Response: {JSON.stringify(applicationRes)}</div>
        </div>
      }
    </div>
  );
}


function ApplicationDatastore() {
  const [workspaceId, setWorkspaceId] = React.useState<string>('');
  const [workspaceIdIn, setWorkspaceIdIn] = React.useState<string>('');

  const handleClick = () => {
    setWorkspaceIdIn(workspaceId);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWorkspaceId(event.target.value);
  }
  return (
    <>
        <div className="title-query">Query: Get Application Datastores</div>
        <input onChange={handleChange} placeholder="Workspace ID..." />
        <button onClick={handleClick} className="icon">
          Workspace ID
        </button>
        <table className="table-content">
          <tbody>
          <tr>
            <td>index</td>
            <td>Application and Datastore</td>
            </tr>
            {workspaceId && 
            <GetApplicationAndDatastore workspaceId={workspaceIdIn} ></GetApplicationAndDatastore>
            }
          </tbody>
        </table>
        <div className="title-mutation">Mutation: Add Application</div>
        <AddApplication></AddApplication>
    </>
  );
}

export default ApplicationDatastore;
