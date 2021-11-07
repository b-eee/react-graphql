import { useMutation } from "@apollo/client";
import {GET_ITEMS, ADD_ITEM} from '../service-graphql/item'
import {
  PropsGetItem,
  DatastoreItems,
  DatastoreCreateNewItemRes,
} from '../models/item'
import {GetItemsParameters, NewItemActionParameters} from '../dto/item'

function GetItems(props: PropsGetItem) {
  const data = props.data;
  return data.items.map((item: any, index: string) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{JSON.stringify(item)}</td>
        </tr>
      );
  })
}

const AddItem: any = ()=> {
  let projectIdIn: HTMLInputElement|null,
      datastoreIdIn: HTMLInputElement|null,
      item: HTMLInputElement|null
  const [addItem, { data, loading, error }] = useMutation<{
    datastoreCreateNewItem: DatastoreCreateNewItemRes
  }, 
  {
    projectId: string,
    datastoreId: string,
    newItemActionParameters: NewItemActionParameters
  }>(ADD_ITEM);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addItem({ 
            variables: {
              projectId: projectIdIn?.value ? projectIdIn?.value: '',
              datastoreId: datastoreIdIn?.value ? datastoreIdIn?.value: '',
              newItemActionParameters: {
                item: item?.value ? JSON.parse(item?.value) : 1,
              }
            }
          });
        }}
      >
        <div className="body-input">
          <div>Project ID:</div>
          <div className="input-field">
              <input
              placeholder="project Id"
              ref={node => {
                projectIdIn = node;
              }}
            />
          </div>
        </div>
        <div className="body-input">
          <div>Datastore ID:</div>
          <div className="input-field">
              <input
              placeholder="datastore Id"
              ref={node => {
                datastoreIdIn = node;
              }}
            />
          </div>
        </div>
        <div>newItemActionParameters Json:https://apidoc.hexabase.com/docs/v0/items-search/ItemList</div>
        <div className="body-input">
          <div>Item: {JSON.stringify({ "param1" : "field_id" , "param2": "TITLE test"})},</div>
          <div className="input-field type-json">
              <input
              placeholder="item type Json"
              ref={node => {
                item = node;
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
      page:  HTMLInputElement|null,
      per_page:  HTMLInputElement|null;
  const  [ getItem,{ data, loading, error }] = useMutation<{
    datastoreGetDatastoreItems: DatastoreItems
  },
  {
    projectId: string,
    datastoreId: string,
    getItemsParameters?: GetItemsParameters
  }>(GET_ITEMS);

  return (
    <div>
        <div className="title-query">Query: Get Items</div>
          <form
            onSubmit={e => {
              e.preventDefault();
              getItem({ variables:  {
                projectId: projectId?.value ? projectId?.value : '',
                datastoreId: datastoreId?.value ? datastoreId?.value : '',
                getItemsParameters: {
                  page: page?.value ? parseInt(page?.value) : 1,
                  per_page: per_page?.value ? parseInt(per_page?.value) : 0,
                }
              } });
            }}
          >
          <div className="item-body-form">
            <div className="body-input">
              <div>Project ID:</div>
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
              <div>Datastore ID:</div>
              <div className="input-field">
                  <input
                  placeholder="datastore Id"
                  ref={node => {
                    datastoreId = node;
                  }}
                />
              </div>
            </div>
            <div>Some field require: https://apidoc.hexabase.com/docs/v0/items-search/ItemList</div>
            <div className="body-input">
              <div>Page:</div>
              <div className="input-field">
                  <input
                  placeholder="page default 1"
                  ref={node => {
                    page = node;
                  }}
                />
              </div>
            </div>
            <div className="body-input">
              <div>Per page:</div>
              <div className="input-field">
                  <input
                  placeholder="per_page default 0"
                  ref={node => {
                    per_page = node;
                  }}
                />
              </div>
            </div>
            <button className="button-mutation" type="submit">Get Items</button>
          </div>
          </form>
        <table className="table-content">
          <thead>
            <tr>
              <th>Index</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              <GetItems data={data.datastoreGetDatastoreItems} ></GetItems>
            }
            {loading && 
              <tr>
                <td>Loading...</td>
                <td></td>
              </tr>
            }
            {error && 
              <tr>
                <td>Error</td>
                <td>{error}</td>
              </tr>
            }
          </tbody>
          {data &&
          <div>{data.datastoreGetDatastoreItems.totalItems}</div>
            }
        </table>
        <div className="title-mutation">Mutation: Create Item</div>
        <AddItem></AddItem>
    </div>
  );
}

export default Items;
