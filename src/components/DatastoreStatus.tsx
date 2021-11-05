import React from 'react';
import {
  useQuery,
  gql,
} from "@apollo/client";


const GET_DATASTORESTATUS = gql`
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
}
`;

function GetStatus(props: any) {
  const datastoreId = props.datastoreId
  const  { data, loading, error } = useQuery(GET_DATASTORESTATUS, 
    {
      variables: { datastoreId },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
  return data.datastoreGetStatuses.map((appDs: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(appDs)}</td>
        </tr>
      );
  })

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
        <button onClick={handleClick} className="icon">
        Datastore Id
        </button>
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
