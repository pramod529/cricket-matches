import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Dialog} from 'primereact/dialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { fetchMatches } from '../../services/fetchCricketMatches.service';

BigCalendar.momentLocalizer(moment);
let views= BigCalendar.Views
views.MONTH = "month";
console.log(Object.keys(views));
let allViews = Object
  .keys(BigCalendar.Views)
  .map((k => BigCalendar.Views[k]));
let events = [
    {
      'title': 'IND VS ENG T20 Match',
      'start': new Date("2020-08-31 12:30"),
      'end': new Date("2020-08-31 16:30")
    },
    {
      'title': 'IND VS AUS T20 Match',
      'start': new Date("2020-08-09 12:30"),
      'end': new Date("2020-08-09 16:30")
    },  
    {
        'title': 'IND VS WID T20 Match',
        'start': new Date("2020-08-12 12:30"),
        'end': new Date("2020-08-12 16:30")
    },
    {
        'title': 'IND VS NZ T20 Match',
        'start': new Date("2020-08-15 12:30"),
        'end': new Date("2020-08-15 16:30")
    },
    {
        'title': 'IND VS PAK T20 Match',
        'start': new Date("2020-08-18 12:30"),
        'end': new Date("2020-08-18 16:30")
    },
    {
        'title': 'IND VS BAN T20 Match',
        'start': new Date("2020-08-21 12:30"),
        'end': new Date("2020-08-21 16:30")
    },
    {
        'title': 'IND VS SL T20 Match',
        'start': new Date("2020-08-24 12:30"),
        'end': new Date("2020-08-24 16:30")
    },
    {
        'title': 'INDA VS INDB Paytm Test Match',
        'start': new Date("2020-08-25 09:30"),
        'end': new Date("2020-08-29 16:30")
    }
  ];
export default class Dashboard extends Component {
    constructor(...args) {
        super(...args)
        this.state = { visible:false,events,selectedEvent: '' }
    }
    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
          this.setState({
            events: [
              ...this.state.events,
              {
                start,
                end,
                title,
              },
            ],
          })
      }
      componentWillMount() {
        fetchMatches()
        .then(res => {
            console.log('fetchMatches',res);
            res.data.forEach((e,i) => {
                let event = {}
                let uniqueId;
                var now = new Date();
                uniqueId = now.getFullYear().toString(); 
                uniqueId += ((now.getMonth()+1) < 10 ? '0' : '') + now.getMonth().toString();
                uniqueId += ((now.getDate() < 10) ? '0' : '') + now.getDate().toString();
                uniqueId += ((now.getHours() < 10) ? '0' : '') + now.getHours().toString();
                uniqueId += ((now.getMinutes() < 10) ? '0' : '') + now.getMinutes().toString();
                uniqueId += ((now.getSeconds() < 10) ? '0' : '') + now.getSeconds().toString();
                //event.id = uniqueId+i;
                console.log('id',uniqueId+i);
                event.title = e.name+i;
                console.log('title',e.name);
                let startMatchTime = new Date(e.date);
                event.start = new Date(`${startMatchTime.getFullYear().toString() + '-' + ((startMatchTime.getMonth()+1)< 10 ? '0' : '') + (startMatchTime.getMonth()+1).toString() + '-' + ((startMatchTime.getDate() < 10 ? '0' : '') + startMatchTime.getDate().toString()) + ' 16:30'}`);
                //event.startTime = `${startMatchTime.getFullYear().toString() + '-' + ((startMatchTime.getMonth()+1)< 10 ? '0' : '') + (startMatchTime.getMonth()+1).toString() + '-' + ((startMatchTime.getDate() < 10 ? '0' : '') + startMatchTime.getDate().toString()) + ' 16:30'}`;
                console.log('startTime',`${startMatchTime.getFullYear().toString() + '-' + ((startMatchTime.getMonth()+1)< 10 ? '0' : '') + (startMatchTime.getMonth()+1).toString() + '-' + ((startMatchTime.getDate() < 10 ? '0' : '') + startMatchTime.getDate().toString()) + ' 16:30'}`);
                console.log('start',new Date(`${startMatchTime.getFullYear().toString() + '-' + ((startMatchTime.getMonth()+1)< 10 ? '0' : '') + (startMatchTime.getMonth()+1).toString() + '-' + ((startMatchTime.getDate() < 10 ? '0' : '') + startMatchTime.getDate().toString()) + ' 16:30'}`));
                let endMatchTime = new Date(e.date);
                event.end = new Date(`${endMatchTime.getFullYear().toString() + '-' + ((endMatchTime.getMonth()+1)< 10 ? '0' : '') + (endMatchTime.getMonth()+1).toString() + '-' + ((endMatchTime.getDate() < 10 ? '0' : '') + endMatchTime.getDate().toString()) + ' 23:30'}`);
                //event.endTime = `${endMatchTime.getFullYear().toString() + '-' + ((endMatchTime.getMonth()+1)< 10 ? '0' : '') + (endMatchTime.getMonth()+1).toString() + '-' + ((endMatchTime.getDate() < 10 ? '0' : '') + endMatchTime.getDate().toString()) + ' 23:30'}`;
                console.log('endTime',`${endMatchTime.getFullYear().toString() + '-' + ((endMatchTime.getMonth()+1)< 10 ? '0' : '') + (endMatchTime.getMonth()+1).toString() + '-' + ((endMatchTime.getDate() < 10 ? '0' : '') + endMatchTime.getDate().toString()) + ' 23:30'}`);
                console.log('end',new Date(`${endMatchTime.getFullYear().toString() + '-' + ((endMatchTime.getMonth()+1)< 10 ? '0' : '') + (endMatchTime.getMonth()+1).toString() + '-' + ((endMatchTime.getDate() < 10 ? '0' : '') + endMatchTime.getDate().toString()) + ' 23:30'}`));
                events.push(event);
            });
            this.setState({events:events});
        })
        .catch(error => {
            console.log('Error in fetching matches :: ', error);
            return;
        });
    }
    onSelectEvent (event) {
        console.log('events',event.title)
      this.setState({visible:true,selectedEvent:event.title});
    }
    render() {
        const footer = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={() => this.setState({visible: false,selectedEvent: ''})} />
                <Button label="No" icon="pi pi-times" onClick={() => this.setState({visible: false,selectedEvent: ''})} />
            </div>
        );
        const myIcon = (
            <button className="p-dialog-titlebar-icon p-link">
                <span className="pi pi-search"></span>
            </button>
        )
        console.log(BigCalendar.Views);
        console.log(this.state.events);
        return (
            <div className="auth-inner-dashboard">
                <h3>Cricket Match Calender</h3>
                <BigCalendar
                events={this.state.events}
                views ={allViews}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()}
                style={{ height: 500 }}
                onSelectEvent={event => this.onSelectEvent(event)}
                onSelectSlot={this.handleSelect}
                />
                <Dialog header={this.state.selectedEvent} footer={footer} iconsTemplate={myIcon} visible={this.state.visible}  style={{width: '50vw'}} modal={true} onHide={() => this.setState({visible: false,selectedEvent: ''})}>
                The original format of the NatWest Series was a three-team triangular tournament, involving England and two visiting international sides. Each of the three teams would play the other two three times each, after which the two top teams would face each other in a final at Lord's in London. The ten matches would be played at the seven international grounds (Lord's, Edgbaston, Headingley, Old Trafford, The Oval, Trent Bridge and the Riverside Ground), as well as other county cricket grounds such as the St Lawrence Ground (Canterbury), Sophia Gardens (Cardiff), the Rose Bowl (Southampton) and at Bristol.
                <br/>
                <br/>
                Do you want to add this match to your favourites match list ?
                </Dialog>
            </div>
        );
    }
}