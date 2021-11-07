import React from 'react';
import { useQuery } from "@apollo/client";
import {GET_DATASTORESTATUS} from '../service-graphql/datastore'
import {GetStatuses, PropDatastoreId} from '../models/datastore'

function GetStatus(props: PropDatastoreId): any {
  const datastoreId = props.datastoreId
  const  { data, loading, error } = useQuery<{
    datastoreGetStatuses: [GetStatuses]
  },
  { 

  }>(GET_DATASTORESTATUS, 
    {
      variables: { datastoreId },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error</td></tr>;
  const datastoreStatuses = data?.datastoreGetStatuses

  if(datastoreStatuses){
    return datastoreStatuses.map((datastoreStatus: GetStatuses, index: number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(datastoreStatus)}</td>
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

function DatastoreStatus() {
  const [datastoreIdInput, setDatastoreIdInput] = React.useState<string>('');
  const [datastoreId, setDatastoreId] = React.useState<string>('');

  const handleClick = () => {
    setDatastoreIdInput(datastoreId);
  }

  return (
    <>
        <div className="title-query">Query: Get Datastores Status</div>
        <input onChange={(e) => setDatastoreId(e.target.value)} placeholder="Datastore Id..." />
        <button onClick={handleClick} className="icon">Datastore Id</button>
        <table className="table-content">
          <tr>
            </tr>
            <thead>
              <tr>
                <th>index</th>
                <th scope="col">Datastore Status</th>
              </tr>
          </thead>
          <tbody>
            {datastoreIdInput && 
            <GetStatus datastoreId={datastoreIdInput} ></GetStatus>
            }
          </tbody>
        </table>
    </>
  );
}

export default DatastoreStatus;
