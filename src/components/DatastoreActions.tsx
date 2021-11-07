import React from 'react';
import { useQuery } from "@apollo/client";
import {GET_DATASTOREACTION} from '../service-graphql/datastore'
import { PropDatastoreId, DatastoreGetActions } from '../models/datastore'

function GetActions(props: PropDatastoreId): any {
  const datastoreId = props.datastoreId
  const  { data, loading, error } = useQuery<{
    datastoreGetActions: [DatastoreGetActions]
  }>(GET_DATASTOREACTION, 
    {
      variables: { datastoreId },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error</td></tr>;
  const datastoreActions = data?.datastoreGetActions
  if(datastoreActions){
    return datastoreActions.map((datastoreAction:DatastoreGetActions, index:number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(datastoreAction)}</td>
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

function DatastoreActions() {
  const [datastoreIdInput, setDatastoreIdInput] = React.useState('');
  const [datastoreId, setDatastoreId] = React.useState('');

  const handleClick = () => {
    setDatastoreIdInput(datastoreId);
  }

  return (
    <>
        <div className="title-query">Query: Get Datastores Actions</div>
        <input onChange={(e) => setDatastoreId(e.target.value)} placeholder="Datastore Id..." />
        <button onClick={handleClick} className="icon">Datastore Id</button>
        <table className="table-content">
          <tr>
            </tr>
            <thead>
              <tr>
                <th>Index</th>
                <th scope="col">Datastore Actions</th>
              </tr>
          </thead>
          <tbody>
            {datastoreIdInput && 
            <GetActions datastoreId={datastoreIdInput} ></GetActions>
            }
          </tbody>
        </table>
    </>
  );
}

export default DatastoreActions;
