import { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import API_END_POINT from "./config";
import axios from "axios";
import ConfirmModal from "./Components/ConfirmModal";
import AddConsultantModal from "./Components/AddConsultantModal";

function App() {
  const [rowData, setRowData] = useState([]);
  const [pageState, setPageState] = useState({
    userGroup: "superUser",
    originalData: null,
    originalId: -1,
  });
  const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const csrftoken = readCookie("csrftoken");
  const headers = { "X-CSRFToken": csrftoken };

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [show, setShow] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const findIndexById = (arr, id) => {
    const requiredIndex = arr.findIndex((el) => {
      return el.id === id;
    });
    return requiredIndex;
  };

  const updateValue = async (data) => {
    return await axios.patch(
      `${API_END_POINT}consultant/${pageState?.originalId}/`,
      data,
      {
        headers: headers,
      }
    );
  };

  const onCellValueChanged = async (event) => {
    console.log(event);
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
    if (event.data.id) {
      const requiredIndex = findIndexById(
        pageState?.originalData?.rows,
        event.data.id
      );
      requiredIndex !== -1 &&
        pageState?.originalData?.rows.splice(requiredIndex, 1);
      pageState?.originalData?.rows.splice(requiredIndex, 0, event.data);
      // const rows = [...pageState?.originalData?.rows, ...[event.data]];
      const objData = {
        id: pageState?.originalId,
        data: JSON.stringify({
          columns: pageState?.originalData?.columns,
          rows: pageState?.originalData?.rows,
        }),
      };

      await updateValue(objData);
      fetchData();
    }
  };

  const ActionCellRenderer = (params) => {
    const element = document.createElement("span");
    const btn = document.createElement(`button`);
    btn.innerHTML = "Edit";
    btn.className = "btn btn-primary";
    btn.onclick = function () {
      alert("Button is clicked");
    };
    const cancelBtn = document.createElement(`button`);
    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
    if (isCurrentRowEditing) {
      const cancelBtn = document.createElement(`button`);
      cancelBtn.innerHTML = "Cancel";
      cancelBtn.className = "btn btn-secondary";
      cancelBtn.onclick = function () {
        alert("Button is clicked");
      };
      btn.innerHTML = "Update";
    }
    element.appendChild(btn);
    isCurrentRowEditing && element.appendChild(cancelBtn);
    return element;
  };

  const fetchData = async () => {
    const res = await fetch(`${API_END_POINT}consultant/`);
    let data = await res.json();
    const originalData = data;
    console.log(data);
    const userGroup = window.sessionStorage.getItem("userGroup");
    data = JSON.parse(data && data[0]?.data)?.rows;
    console.log("userGroup", userGroup, userGroup !== "superUser");
    if (userGroup !== "superUser") {
      const groupArray = userGroup.split("_");
      const vendorName = groupArray && groupArray.length > 0 && groupArray[0];
      console.log("vendorName", userGroup, vendorName);
      data = data.filter(
        (row) => row["EDA Vendor"]?.toLowerCase() === vendorName?.toLowerCase()
      );
    }
    setRowData(data);
    setPageState({
      ...pageState,
      ...{
        originalData: JSON.parse(originalData && originalData[0]?.data),
        originalId: JSON.parse(originalData && originalData[0]?.id),
      },
    });
  };

  useEffect(() => {
    setPageState({
      userGroup: window.sessionStorage.getItem("userGroup"),
    });
    fetchData();
    console.log(window.sessionStorage.getItem("userGroup"));
  }, []);

  const addConsultant = () => {
    setShowAddModal(true);
  };

  const addColumn = () => {
    setShowAddModal(true);
  };

  const saveConsultant = async () => {
    let item = {};
    Object.keys(rowData[0]).forEach((col) => {
      if (col !== "id") {
        item[col] =
          document.getElementById(col) && document.getElementById(col).value;
      }
    });
    if (
      pageState?.originalData?.rows &&
      pageState?.originalData?.rows.length > 0
    ) {
      item["id"] =
        pageState?.originalData?.rows[pageState?.originalData?.rows.length - 1]
          ?.id + 1;
    } else {
      item["id"] = 1;
    }

    pageState?.originalData?.rows.push(item);

    const objData = {
      id: pageState?.originalId,
      data: JSON.stringify({
        columns: pageState?.originalData?.columns,
        rows: pageState?.originalData?.rows,
      }),
    };
    const res = await updateValue(objData);
    console.log("update", res);
    if (res.status === 200) {
      setShowAddModal(false);
      fetchData();
    }
  };

  const removeConsultant = () => {
    setShow(true);
  };

  // const actionCellRenderer(params) {
  // console.log('params', params);
  //   let eGui = document.createElement("div");
  //   let editingCells = params.api.getEditingCells();
  //   // checks if the rowIndex matches in at least one of the editing cells
  //   let isCurrentRowEditing = editingCells.some((cell) => {
  //     return cell.rowIndex === params.node.rowIndex;
  //     });
  //   if (isCurrentRowEditing) {
  //       eGui.innerHTML = `
  //           <Button variant="primary" onClick={${addConsultant}}>Edit</Button>
  //           <Button variant="secondary" onClick={${addConsultant}}>Cancel</Button>
  //           `;
  //   } else {
  //   eGui.innerHTML = `
  //   <Button variant="primary" onClick={${addConsultant}}>Edit</Button>`;
  // }
  // return eGui;
  // }

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    selectedRows && selectedRows.length > 0 && setShowRemoveButton(true);
  };

  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    var selectedRows = gridApi.getSelectedRows();
    const requiredIndex = findIndexById(
      pageState?.originalData?.rows,
      selectedRows[0]?.id
    );
    requiredIndex !== -1 &&
      pageState?.originalData?.rows.splice(requiredIndex, 1);
    const objData = {
      id: pageState?.originalId,
      data: JSON.stringify({
        columns: pageState?.originalData?.columns,
        rows: pageState?.originalData?.rows,
      }),
    };
    await updateValue(objData);
    fetchData();
    setShow(false);
    setShowRemoveButton(false);
  };

  const exportToCsv = () => {
    gridApi.exportDataAsCsv();
  };

  const handleAddModalClose = () => setShowAddModal(false);

  console.log(
    "rowData",
    rowData,
    "keys",
    Object.keys(rowData.length > 0 && rowData[0]),
    "pageState",
    pageState?.originalData
  );

  return (
    <div className="App">
      {/* {pageState.userGroup === "superUser" ? ( */}
      <div>
        <Button variant="primary" className={"m-2"} onClick={addConsultant}>
          Add Consultant
        </Button>
        <Button variant="primary" className={"m-2"} onClick={addColumn}>
          Add Column
        </Button>
        {showRemoveButton && (
          <Button variant="danger" className={"m-2"} onClick={removeConsultant}>
            Remove Consultant
          </Button>
        )}
        <Button variant="primary" className="m-2" onClick={exportToCsv}>
          Export to CSV
        </Button>
      </div>
      {/* ) : null} */}
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleAdd={addConsultant}
      />
      <AddConsultantModal
        show={showAddModal}
        handleClose={handleAddModalClose}
        handleAdd={saveConsultant}
        rowData={rowData}
      />
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "1000px" }}
      >
        <AgGridReact
          components={{
            actionCellRenderer: ActionCellRenderer,
          }}
          defaultColDef={{
            flex: 1,
            minWidth: 200,
            filter: true,
            editable: true,
          }}
          rowData={rowData}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
          suppressExcelExport={true}
        >
          {pageState?.originalData?.columns?.map((val) => (
            <AgGridColumn
              field={val?.name}
              pinned={
                val?.name === "id" || val?.name === "Consultant Name"
                  ? "left"
                  : null
              }
            ></AgGridColumn>
          ))}
          {/* <AgGridColumn
            field={"Action"}
            editable={false}
            cellRenderer={"actionCellRenderer"}
          ></AgGridColumn> */}
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
