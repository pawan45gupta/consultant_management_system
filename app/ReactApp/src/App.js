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

  const onCellValueChanged = (event) => {
    console.log(event);
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
    if (event.data.id) {
      axios.put(`${API_END_POINT}consultant/${event.data.id}/`, event.data, {
        headers: headers,
      });
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
    console.log(data);
    const userGroup = window.sessionStorage.getItem("userGroup");
    console.log('userGroup', userGroup, userGroup !== "superUser");
    if (userGroup !== "superUser") {
      const groupArray = userGroup.split("_");
      const vendorName = groupArray && groupArray.length > 0 && groupArray[0];
      console.log("vendorName", userGroup, vendorName);
      data = data.filter(
        (row) => row?.eda_vendor?.toLowerCase() === vendorName?.toLowerCase()
      );
    }
    setRowData(data);
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

  const saveConsultant = async () => {
    // const item = {
    //   consultant_name: "Gupta, Pawan",
    //   uid: "c_adnant",
    //   first_name: " Adnan",
    //   last_name: "Tanwir",
    //   eda_vendor: "Cadence",
    //   consultant_type: "Applications Engineer",
    //   technology_focus: "Functional Verification",
    //   access_type: "Badge and System",
    //   consultant_start_date: "2015-03-23",
    //   proposed_end_date: "2024-12-30",
    //   qcm_consultant_current_status: "Active",
    //   off_board_consultant: null,
    //   current_vpn_status: "Enabled",
    //   consultant_location: null,
    //   current_consultant_sponsor: "Huang, Joe",
    //   project: "",
    //   justificaiton_for_remaining_onboarded: null,
    //   approval_for_justification: null,
    //   approval_comments: null,
    // };
    let item = {};
    Object.keys(rowData[0]).forEach((col) => {
      if (col !== "id") {
        item[col] =
          document.getElementById(col) && document.getElementById(col).value;
      }
    });

    const res = await axios.post(`${API_END_POINT}consultant/`, item, {
      headers: headers,
    });
    console.log("update", res);
    if (res.status === 201) {
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
    let res = await axios.delete(
      `${API_END_POINT}consultant/${selectedRows[0]?.id}`,
      {
        headers: headers,
      }
    );
    fetchData();
    setShow(false);
    setShowRemoveButton(false);
  };

  const exportToCsv = () => {
    gridApi.exportDataAsCsv();
  };

  const handleAddModalClose = () => setShowAddModal(false);

  return (
    <div className="App">
      {pageState.userGroup === "superUser" ? (
        <div>
          <Button variant="primary" className={"m-2"} onClick={addConsultant}>
            Add Consultant
          </Button>
          {showRemoveButton && (
            <Button
              variant="danger"
              className={"m-2"}
              onClick={removeConsultant}
            >
              Remove Consultant
            </Button>
          )}
          <Button variant="primary" className="m-2" onClick={exportToCsv}>
            Export to CSV
          </Button>
        </div>
      ) : null}
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
          {rowData &&
            rowData.length > 0 &&
            Object.keys(rowData[0])?.map((val) => (
              <AgGridColumn
                field={val}
                pinned={
                  val === "id" || val === "consultant_name" ? "left" : null
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
