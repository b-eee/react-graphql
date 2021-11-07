export interface PropsGetApplication {
    workspaceId: string
  }

export interface FieldDatastores {
  datastore_id?: string;
  name?: string;
}
  
export interface ApplicationAndDataStore {
  application_id?: string;
  name?: string;
  display_id?: string;
  datastores?: FieldDatastores[];
}
  
export interface CreateProject {
  project_id?: string;
}