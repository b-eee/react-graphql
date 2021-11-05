import './App.css';
import React from 'react';
import Workspaces from './components/Workspaces';
import ApplicationDatastore from './components/ApplicationDatastore';
import Items from './components/Items';
import ItemDetail from './components/ItemDetail';
import DatastoreStatus from './components/DatastoreStatus';
import DatastoreActions from './components/DatastoreActions';

function App() {
  const [option, setOption] = React.useState<String>('')
  return (
    <div className="App">
      <div className="container">
        <button onClick={() => setOption('workspaces')}>workspaces</button>
        <button onClick={() => setOption('applicationdatastores')}>Aplication and Datastore</button>
        <button onClick={() => setOption('items')}>Items</button>
        <button onClick={() => setOption('itemsdetail')}>Items Detail</button>
        <button onClick={() => setOption('datastorestatus')}>Datastore Status</button>
        <button onClick={() => setOption('datastoreactions')}>Datastore Action</button>
        {option === 'workspaces' && 
          <Workspaces/>
        }
        {option === 'applicationdatastores' && 
          <ApplicationDatastore/>
        }
        {option === 'items' && 
          <Items/>
        }
        {option === 'itemsdetail' && 
          <ItemDetail/>
        }
        {option === 'datastorestatus' && 
          <DatastoreStatus/>
        }
        {option === 'datastoreactions' && 
          <DatastoreActions/>
        }
      </div>
    </div>
  );
}

export default App;
