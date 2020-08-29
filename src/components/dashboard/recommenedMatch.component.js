import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default class RecommenedMatch extends Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            globalFilter: null
        };
    }

    componentDidMount() {
        const data = [
            {"matchTitle": "IND VS WID World T20", "matchTime": "2020-08-09 16:30", "location": "England", "matchId": "20200801"},
            {"matchTitle": "IND VS AUS World T20", "matchTime": "2020-08-11 16:30", "location": "England", "matchId": "20200802"},
            {"matchTitle": "IND VS NZ World T20", "matchTime": "2020-08-13 16:30", "location": "England", "matchId": "20200803"},
            {"matchTitle": "IND VS AFG World T20", "matchTime": "2020-08-15 16:30", "location": "England", "matchId": "20200804"},
            {"matchTitle": "IND VS PAK World T20", "matchTime": "2020-08-17 16:30", "location": "England", "matchId": "20200805"},
            {"matchTitle": "IND VS ENG World T20", "matchTime": "2020-08-19 16:30", "location": "England", "matchId": "20200806"},
            {"matchTitle": "IND VS SL World T20", "matchTime": "2020-08-21 16:30", "location": "England", "matchId": "20200807"},
            {"matchTitle": "IND VS BAN World T20", "matchTime": "2020-08-23 16:30", "location": "England", "matchId": "20200808"},
            {"matchTitle": "IND VS SA World T20", "matchTime": "2020-08-25 16:30", "location": "England", "matchId": "20200809"},
            {"matchTitle": "IND VS ZIM World T20", "matchTime": "2020-08-27 16:30", "location": "England", "matchId": "20200810"}
        ];
        this.setState({cars:data})
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh"/>;
        const header = (
            <div className="table-header">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        return (
            <div className="auth-inner-favourite datatable-paginator-demo" >
                <h3>Recommened Matches</h3>
                <DataTable value={this.state.cars} responsive={true} paginator={true} paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Pagniation For Recommened Matches" globalFilter={this.state.globalFilter}
                    header={header} rows={5} rowsPerPageOptions={[5,10,20]}>
                    <Column field="matchId" header="Match Id" filter filterPlaceholder="Search By Match Id" sortable/>
                    <Column field="matchTitle" header="Match Title" filter filterPlaceholder="Search By Match Title" sortable/>
                    <Column field="matchTime" header="Match Time" filter filterPlaceholder="Search By Match Time" sortable/>
                    <Column field="location" header="Location" filter filterPlaceholder="Search By Location" sortable/>
                </DataTable>
            </div>
        );
    }
}