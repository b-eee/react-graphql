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

type Props = {
  data: DatastoreItems
}

interface  SearchCondition {
  search_value?: any,
  data_type?: string,
  id?: string,
  rpf_id?: string,
  exact_match?: boolean,
  not_match?: boolean,
  include_null?: boolean,
  conditions?: SearchCondition,
  use_or_condition?: boolean,
}

interface SortField {
  id?: string,
  order?: string,
}
interface GetItemsParameters {
  conditions?: SearchCondition[],
  use_or_condition?: boolean,
  unread_only?: boolean,
  sort_fields?: SortField,
  sort_order?: string,
  page: number,
  per_page: number,
  use_field_id?: boolean,
  use_display_id?: boolean,
  include_links?: boolean,
  include_lookups?: boolean,
  return_number_value?: boolean,
  format?: string,
  return_count_only?: boolean,
  omit_fields_data?: boolean,
  omit_total_items?: boolean,
  data_result_timeout_sec?: number,
  total_count_timeout_sec?: number,
  debug_query?: boolean,
}

interface DatastoreItems {
  items?: any,
  totalItems?: number
}

interface DatastoreCreateNewItemRes {
  error?: any,
  history_id?: string,
  item?: any,
  item_id?: string,
}

interface FieldAccessKeyUpdates {
  overwrite?: boolean,
  ignore_action_settings?: boolean,
  apply_related_ds?: boolean,
  Groups_to_publish?: any,
  users_to_publish?: any,
  roles_to_publish?: any
}
interface NewItemActionParameters {
  item: any,
  action_id?: string,
  use_display_id?: boolean,
  is_notify_to_sender?: boolean,
  return_item_result?: boolean,
  ensure_transaction?: boolean,
  exec_children_post_procs?: boolean,
  as_params?: any,
  related_ds_items?: any,
  access_key_updates?: FieldAccessKeyUpdates,
}

function GetItems(props: Props) {
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
      // page: HTMLInputElement|null;
  const [addItem, { data, loading, error }] = useMutation<{datastoreCreateNewItem: DatastoreCreateNewItemRes}, 
  {projectId: string, datastoreId: string, newItemActionParameters: NewItemActionParameters}>(ADD_ITEM);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addItem({ variables: {
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
          <div>project ID:</div>
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
          <div>datastore ID:</div>
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
          <div>item: {JSON.stringify({ "param1" : "field_id" , "param2": "TITLE test"})},</div>
          <div className="input-field type-json">
              <input
              placeholder="item type Json"
              ref={node => {
                item = node;
              }}
            />
          </div>
        </div>
        {/* <div className="body-input">
          <div>page:</div>
          <div className="input-field">
              <input
              placeholder="example: 0"
              ref={node => {
                page = node;
              }}
            />
          </div>
        </div> */}
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
  const  [ getItem,{ data, loading, error }] = useMutation<{datastoreGetDatastoreItems: DatastoreItems},{projectId: string, datastoreId: string, getItemsParameters?: GetItemsParameters }>(GET_ITEMS);
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
          <div>
            <div>projectId:
            <input
              placeholder="input projectId"
              ref={node => {
                projectId = node;
              }}
            />
            </div>
            <div>datastoreId:
            <input
              placeholder="input datastoreId"
              ref={node => {
                datastoreId = node;
              }}
            />
            </div>
            Some field require
            <div>page:
            <input
              placeholder="input page"
              ref={node => {
                page = node;
              }}
            />
            </div>
            <div>per_page:
            <input
              placeholder="input per_page"
              ref={node => {
                per_page = node;
              }}
            />
            </div>
            <button className="button-mutation" type="submit">Get Items</button>
          </div>
          </form>
        <table className="table-content">
          <thead>
            <tr>
              <th>index</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              <GetItems data={data.datastoreGetDatastoreItems} ></GetItems>
            }
            {loading && 
              <tr>
                <td>loading</td>
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
        </table>
        <div className="title-mutation">Mutation: Create Item</div>
        <AddItem></AddItem>
    </div>
  );
}

export default Items;
