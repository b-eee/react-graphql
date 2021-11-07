import React from 'react';
import { GET_APPLICATIONDATASTORE, ADD_APPLICATION } from '../service-graphql/application'
import { useQuery, useMutation } from "@apollo/client";
import {PropsGetApplication, ApplicationAndDataStore, CreateProject } from '../models/application'
import {CreateProjectParams} from '../dto/application'

function GetApplicationAndDatastore(props: PropsGetApplication): any {

  const workspaceId = props.workspaceId
  const  { data, loading, error } = useQuery<{getApplicationAndDataStore: [ApplicationAndDataStore]}, {workspaceId: string}>(GET_APPLICATIONDATASTORE, 
    {
      variables: { workspaceId },
    });

  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error</td></tr>;
  if (data){
    return data.getApplicationAndDataStore.map((appDs: ApplicationAndDataStore, index: number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(appDs)}</td>
        </tr>
      );
    })
  } else {
    return (
      <tr>
        <td></td>
        <td>Can't load data</td>
      </tr>
    )
  }
}

const AddApplication: any = () =>{
  let tp_id: HTMLInputElement|null;
  let name: HTMLInputElement|null;
  const [addApplication, { data, loading, error }] = useMutation<{applicationCreateProject: CreateProject}, {createProjectParams: CreateProjectParams}>(ADD_APPLICATION);

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

  return (
    <>
        <div className="title-query">Query: Get Application Datastores</div>
        <input onChange={ (event) => setWorkspaceId(event.target.value)} placeholder="Workspace ID..." />
        <button onClick={handleClick} className="icon">
          Workspace ID
        </button>
        <table className="table-content">
          <thead>
            <tr>
              <th>Index</th>
              <th>Application and Datastore</th>
            </tr>
          </thead>
          <tbody>
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
