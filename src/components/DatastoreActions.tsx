import React from 'react';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";


const GET_DATASTORESTATUS = gql`
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
}
`;


function GetActions(props: any) {
  const datastoreId = props.datastoreId
  const  { data, loading, error } = useQuery(GET_DATASTORESTATUS, 
    {
      variables: { datastoreId },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
  return data.datastoreGetActions.map((appDs:any, index:number) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(appDs)}</td>
        </tr>
      );
  })

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
        <button onClick={handleClick} className="icon">
        Datastore Id
        </button>
        <table className="table-content">
          <tr>
            </tr>
            <thead>
              <tr>
                  <th>index</th>
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
