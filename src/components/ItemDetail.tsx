import React from 'react';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

import {DataQuery, PropsItemDetail} from '../models/datastore'

const GET_APPLICATIONDATASTORE = gql`
query Query($itemId: String!, $datastoreId: String!, $projectId: String, $datastoreItemDetailParams: DatastoreItemDetailParams) {
    getDatastoreItemDetails(itemId: $itemId, datastoreId: $datastoreId, projectId: $projectId, datastoreItemDetailParams: $datastoreItemDetailParams) {
      title
      rev_no
      field_values
      status_list
      status_actions
      item_actions
      status_order
      status_action_order
      item_action_order
    }
  }
`;



function GetItemDetail(props: PropsItemDetail) {
  const dataQuery: DataQuery = props.dataQuery
  const {
    projectId,
    datastoreId,
    itemId,
    datastoreItemDetailParams
  } = dataQuery

  const  { data, loading, error } = useQuery(GET_APPLICATIONDATASTORE, 
    {
      variables: {
        projectId,
        datastoreId,
        itemId,
        datastoreItemDetailParams
      },
    });
  if (loading) return <tr><td> Loading...</td></tr>;
  if (error) return <tr><td>Error :(</td></tr>;
  return (
    <tr >
      <td>{JSON.stringify(data.getDatastoreItemDetails)}</td>
    </tr>
  );
}

function ItemDetail() {
  const [dataQuery, setDataQuery] = React.useState<DataQuery>(
    {
      projectId:'',
      datastoreId:'',
      itemId:'',
      datastoreItemDetailParams: {
        include_lookups: true,
        use_display_id: true,
        return_number_value:true,
        format: '',
        include_linked_items: true,
      }
    }
  );
  const [projectId, setProject] = React.useState<string>('');
  const [datastoreId, setDatastore] = React.useState<string>('');
  const [itemId, setItem] = React.useState<string>('');
  const [datastoreItemDetailParams, setDatastoreItemDetailParams] = React.useState<string>('');

  const handleClick = () => {
    setDataQuery({
        projectId,
        datastoreId,
        itemId,
        datastoreItemDetailParams: JSON.parse(datastoreItemDetailParams)
    });
  }

  return (
    <>
        <div className="title-query">Query: Get Item Detail </div>
        <div className="body-input">
          <div>project ID:</div>
          <div className="input-field"><input onChange={(e) => setProject(e.target.value)} placeholder="project ID..." /></div>
        </div>
        <div className="body-input">
          <div>datastore ID:</div>
          <div className="input-field"><input onChange={(e) => setDatastore(e.target.value)} placeholder="datastore ID..." /></div>
        </div>
        <div className="body-input">
          <div>item ID:</div>
          <div className="input-field"><input onChange={(e) => setItem(e.target.value)} placeholder="item ID..." /></div>
        </div>
        <div className="body-input">
          <div>datastoreItemDetailParams:</div>
          <div className="input-field type-json"><input onChange={(e) => setDatastoreItemDetailParams(e.target.value)} placeholder="datastoreItemDetailParams..." /></div>
        </div>
        <button onClick={handleClick} className="icon">
          Get Item Detail
        </button>
        <table className="table-content">
          <tbody>
          <tr>
            <td>Item Detail</td>
            </tr>
            <GetItemDetail dataQuery= {dataQuery}></GetItemDetail>
          </tbody>
        </table>
    </>
  );
}

export default ItemDetail;
