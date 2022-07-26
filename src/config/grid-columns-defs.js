import { formatCurrency, formatDate } from "./grid-value-formatters";

export const userProjectTable = [
    { headerName: "Id", field: "project_id", maxWidth: 80, resizable: true },
    { headerName: "Name", field: "project_name", resizable: true },
    { headerName: "Role", field: "project_role", resizable: true },
    { headerName: "Type", field: "project_type", resizable: true },
    { headerName: "Start Date", field: "start_date", resizable: true, valueFormatter: formatDate },
    { headerName: "End Date", field: "end_date", resizable: true, valueFormatter: formatDate },
    { headerName: "Status", field: "status", resizable: true },
    { headerName: "Created At", field: "creation_date", resizable: true, valueFormatter: formatDate },
];

export const employeesTable = [
    { headerName: 'Id', field: 'id', resizable: true, maxWidth: 80 },
    { headerName: 'Firstname', field: 'firstname', resizable: true, minWidth: 120 },
    { headerName: 'Lastname', field: 'lastname', resizable: true, minWidth: 120 },
    { headerName: 'Email', field: 'email', minWidth: 250, resizable: true },
    { headerName: 'Contact', field: 'contact', minWidth: 150, resizable: true },
    { headerName: 'Address', field: 'address', minWidth: 150, resizable: true },
    { headerName: 'Role', field: 'role', minWidth: 100, resizable: true },
    { headerName: "Cost Rate", field: "cost_rate", minWidth: 150, resizable: true, valueFormatter: formatCurrency },
    { headerName: "Bill Rate", field: "bill_rate", resizable: true, minWidth: 150, valueFormatter: formatCurrency },
    { headerName: "Created At", field: "creation_date", resizable: true, minWidth: 150, valueFormatter: formatDate },
]

export const projectsTable = [
    { headerName: 'Id', field: 'id', resizable: true, maxWidth: 80 },
    { headerName: 'Name', field: 'project_name', resizable: true, minWidth: 150 },
    { headerName: 'Type', field: 'project_type', resizable: true, minWidth: 150 },
    { headerName: 'Description', field: 'project_description', minWidth: 250, resizable: true },
    { headerName: 'Budget', field: 'budget', minWidth: 150, resizable: true, valueFormatter: formatCurrency },
    { headerName: 'Start Date', field: 'start_date', minWidth: 150, resizable: true, valueFormatter: formatDate },
    { headerName: 'End Date', field: 'end_date', minWidth: 150, resizable: true, valueFormatter: formatDate },
    { headerName: "Status", field: "status", minWidth: 150, resizable: true },
    { headerName: "Created At", field: "creation_date", resizable: true, minWidth: 150, valueFormatter: formatDate },
]

