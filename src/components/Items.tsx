import React from 'react';
import {
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";


const GET_ITEMS = gql`
mutation DatastoreGetDatastoreItemsMutation($getItemsParameters: GetItemsParameters!, $datastoreId: String!, $projectId: String) {
  datastoreGetDatastoreItems(getItemsParameters: $getItemsParameters, datastoreId: $datastoreId, projectId: $projectId) {
    items
    totalItems
  }
}
`;

const ADD_ITEM = gql`
mutation DatastoreGetDatastoreItemsMutation($newItemActionParameters: NewItemActionParameters!, $datastoreId: String!, $projectId: String!) {
  datastoreCreateNewItem(newItemActionParameters: $newItemActionParameters, datastoreId: $datastoreId, projectId: $projectId) {
    error
    history_id
    item
    item_id
  }
}
`;

function GetItems(props: any) {
  const data = props.data;
  return data.datastoreGetDatastoreItems.items.map((item: any, index: string) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(item)}</td>
        </tr>
      );
  })

}


const AddItem: any = ()=> {
  let projectId: HTMLInputElement|null;
  let datastoreId: HTMLInputElement|null;
  let newItemActionParameters: HTMLInputElement|null;
  const [addItem, { data, loading, error }] = useMutation(ADD_ITEM);
  console.log('addItem', addItem)
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addItem({ variables: {
            projectId: projectId?.value,
            datastoreId: datastoreId?.value,
            newItemActionParameters: newItemActionParameters?.value ? JSON.parse(newItemActionParameters?.value): ''
            }
          });
        }}
      >
        <div className="body-input">
          <div>project ID:</div>
          <div className="input-field">
              <input
              placeholder="project Id"
              ref={node => {
                projectId = node;
              }}
            />
          </div>
        </div>
        <div className="body-input">
          <div>datastore ID:</div>
          <div className="input-field">
              <input
              placeholder="datastore Id"
              ref={node => {
                datastoreId = node;
              }}
            />
          </div>
        </div>
        <div className="body-input">
          <div>newItemActionParameters Json:https://apidoc.hexabase.com/docs/v0/items-search/ItemList</div>
          <div className="input-field">
              <input
              placeholder="{'per_page': 1, 'page': 0,..}"
              ref={node => {
                newItemActionParameters = node;
              }}
            />
          </div>
        </div>
        <button className="button-mutation" type="submit">Add Application</button>
      </form>
      <>
        {data && 
        <div>
          {JSON.stringify(data.datastoreCreateNewItem)} 
        </div>
        }
      </>
    </div>
  );
}

function Items() {
  let projectId:  HTMLInputElement|null,
      datastoreId:  HTMLInputElement|null,
      getItemsParameters:  HTMLInputElement|null;;
  const  [ getItem,{ data, loading, error }] = useMutation(GET_ITEMS);
  return (
    <div>
        <div className="title-query">Query: Get Items</div>
          <form
            onSubmit={e => {
              e.preventDefault();
              getItem({ variables:  {
                projectId: projectId?.value,
                datastoreId: datastoreId?.value,
                getItemsParameters: getItemsParameters?.value ? JSON.parse(getItemsParameters?.value): ''
              } });
            }}
          > 
          <input
            placeholder="input projectId"
            ref={node => {
              projectId = node;
            }}
          />
          datastoreId:
          <input
            placeholder="input datastoreId"
            ref={node => {
              datastoreId = node;
            }}
          />
          <input
            placeholder="input name with type JSON"
            ref={node => {
              getItemsParameters = node;
            }}
          />
          <button className="button-mutation" type="submit">Get Items</button>
          </form>
        <table className="table-content">
          <tbody>
          <tr>
            <td>index</td>
            <td>Item</td>
            </tr>
            {data && data !== 'undefined' &&
              <GetItems data={data} ></GetItems>
            }
            {loading && 
              <tr>
                <td>loading</td>
              </tr>
            }
            {error && 
              <tr>
                <td>{error}</td>
              </tr>
            }
          </tbody>
        </table>
        <div className="title-mutation">Mutation: Create Item</div>
        <AddItem></AddItem>
    </div>
  );
}

export default Items;
