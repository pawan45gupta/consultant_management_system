import { useEffect, useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://127.0.0.1:8000/api/consultant/');
      const data = await res.json();
      console.log(data);
      setRowData(data);
    }
    fetchData();
    console.log(window.sessionStorage.getItem('user'))
  },[]);

   return (
    <div className="App">
      <header className="App-header">
       <div className="ag-theme-alpine" style={{ width: '100%', height: '1000px' }}>
           <AgGridReact
               rowData={rowData}>
                {rowData && rowData.length > 0 && Object.keys(rowData[0])?.map(val => <AgGridColumn field={val} pinned={val === 'id' || val === 'consultant_name' ? 'left' : null }></AgGridColumn>)}
           </AgGridReact>
       </div>
      </header>
    </div>
  );
}

export default App;
