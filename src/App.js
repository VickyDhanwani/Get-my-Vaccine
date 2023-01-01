import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './Components/Header';
import InputForm from './Components/Inputs';
import FilteredDataTable from './Components/filteredDataTable';
import LatestUpdate from './Components/LatestUpdate';

class DataLoader extends React.Component {
  state = {
    dataFetch : false
  }
  waitForFewSeconds = (interval) => {
    return new Promise(action => {
      setTimeout(action, interval);
    });
  }

  APIGenerator() {
    var api = this.props.API;
    if(this.props.SearchPreference === "ByDistrict") {
      api = api + "pincode=" + this.props.SearchForPincode + "&date=" + this.props.SearchFromDate;
    }
    else {
      api = api + "pincode=" + this.props.SearchForPincode + "&date=" + this.props.SearchFromDate;
    }
    return api;
  }

  fetchData = async () => {
    var i = 0;
    var api = this.APIGenerator();
    await this.setState({dataFetch : true});
    this.props.updateDataFetching(true);
    console.log(this.state.dataFetch);
    
    while(this.state.dataFetch) {
      fetch(api, {
        method : 'GET',
        headers : new Headers({ "Content-Type": "application/json" })
      }).then(async c => {
        const d = await c.json();
        await this.props.insertIntoRawData(d);
      });
      await this.waitForFewSeconds(this.props.refreshInterval);
      console.log('fetched');
      i = i + 1;
    }
    
  }
  
  stopFetching = () => {
    this.setState({dataFetch : false})
    this.props.updateDataFetching(false);
  }
  render() {
    var frequency = this.props.refreshInterval / 1000;
    
    if(this.state.dataFetch === true) {
      return (<div class = "app-data-refresh">
        <button type = "button" onClick = {this.stopFetching}>Stop Refreshing</button>
        <br/>
        Data is Refreshing at rate of {frequency} seconds 
      </div>);
    }
    else {
      return (
        <div class = "app-data-refresh">
        <button type = "button" onClick = {this.fetchData}>Start Refreshing</button>
        <br/>
        Data Refresh is stopped
      </div>
      );
    }
  }
}

class App extends React.Component {
  state = {
    rawData : [],
    filteredData : [],
    maximumQueue : 20,  //maximum raw data objects
    refreshInterval : 5000, //ms
    currentStatus : "Stopped",
    useremail : null,
    totalRequests : 0,
    batchSize : 20,  //maximum filtered data objects on the frontend, can be modified
    dataFetching : false,
    email : null,
    latestFetchedData : [],
    API : "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?",
    searchPreference : "ByPin",
    searchFromDate : "15-05-21",
    searchForAgeGroup : "18-45",
    SearchForPincode : "",
    SearchForDistrict : ""
  }

  updateSearchPreference = (preference) => {
    this.setState({ searchPreference : preference });
    console.log(preference);
  }
  
  updateAgeGroup = (group) => {
    this.setState({searchForAgeGroup : group});
    console.log(group);
  }

  filterRawData = (elem) => {
    var filteredElement = {
      district : null,
      pincode : null,
      centerName : null,
      feeType : null,
      agelimit : null,
      vaccineType : null,
      availableCapacity : null,
      dateOfAvailability : null,
      refreshTimestamp : null
    }
    var existingFilteredElements = [];
    var newFilteredElements = [];
    var date = new Date();
    var dateString, timeString;
    //console.log("starting ..")
    if(elem.centers.length > 0) {
      elem.centers.forEach(e => {
        e.sessions.forEach(s => {
          filteredElement = new Object();
          filteredElement.district = e.district_name;
          filteredElement.pincode = e.pincode;
          filteredElement.centerName = e.name;
          filteredElement.feeType = e.fee_type;
          filteredElement.agelimit = s.min_age_limit;
          filteredElement.vaccineType = s.vaccine;
          filteredElement.availableCapacity = s.available_capacity;
          filteredElement.dateOfAvailability = s.date;
          
          dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
          timeString = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
          filteredElement.refreshTimestamp = dateString + " " + timeString
          newFilteredElements.push(filteredElement);
        });
      });
      
      this.setState({ latestFetchedData : newFilteredElements });
      if(this.state.filteredData.length + newFilteredElements.length <= this.state.batchSize) {
        existingFilteredElements = this.state.filteredData;
        newFilteredElements.forEach(item => {
          existingFilteredElements.push(item);
        });
      }
      else {
        existingFilteredElements = this.state.filteredData.slice(newFilteredElements.length);
        newFilteredElements.forEach(item => {
          existingFilteredElements.push(item);
        });
      }
      this.setState({filteredData : existingFilteredElements});
    }
    //console.log(this.state.filteredData);
  }

  insertIntoRawData = (elem) => {
    var localrawdata = [];
    if(this.state.rawData.length < this.state.maximumQueue) {
      localrawdata = this.state.rawData;
      localrawdata.push(elem);
      this.setState({rawData : localrawdata});
    }
    else {
      localrawdata = this.state.rawData.slice(1);
      localrawdata.push(elem);
      this.setState({rawData : localrawdata});
    }
    this.filterRawData(elem);
  }

  updateDataFetching = (flag) => {
    this.setState({ dataFetching : flag });
  }

  updateDateString = (date) => {
    this.setState({searchFromDate : date});
    
  }

  updateEmail = (id) => {
    this.setState({email : id});
    
  }

  updatePincode = (pin) => {
    this.setState({SearchForPincode : pin});
    
  }

  updateDistrict = (dis) => {
    this.setState({SearchForDistrict : dis});
    
  }

  clearAllFunction = () => {
    this.setState({
      latestFetchedData : [],
      filteredData : []
    });
  }

  render() {
      
      

      return(
        <div className = "App">
          <Header />
          <InputForm 
            updateSearchPreference = {this.updateSearchPreference}
            updateAgeGroup = {this.updateAgeGroup}
            updateDateString = {this.updateDateString}
            updateEmail = {this.updateEmail}
            updatePincode = {this.updatePincode}
            updateDistrict = {this.updateDistrict}
          />
          <DataLoader
            refreshInterval = {this.state.refreshInterval}
            dataFetching = {this.state.dataFetching}
            updateDataFetching = {this.updateDataFetching}
            insertIntoRawData = {this.insertIntoRawData}
            SearchPreference = {this.state.searchPreference}
            SearchFromDate = {this.state.searchFromDate}
            SearchForPincode = {this.state.SearchForPincode}
            SearchForDistrict = {this.state.SearchForDistrict}
            API = {this.state.API}
          />
          <button type = "button" onClick = {this.clearAllFunction}>CLEAR ALL</button>
          <LatestUpdate
            latestFetchedData = {this.state.latestFetchedData}
            dataFetching = {this.state.dataFetching}
          />
          <FilteredDataTable
            filteredData = {this.state.filteredData}
          />
        </div>
      );
    }
}
export default App;


/*
{centers: Array(1)}
centers: Array(1)
0:
address: "NAGAR-MANMAD Highway SAVADI ROAD"
block_name: "Ahmednagar Corporation"
center_id: 606667
district_name: "Ahmednagar"
fee_type: "Paid"
from: "09:00:00"
lat: 19
long: 74
name: "GARUD HOSPITAL CANCER CENTRE"
pincode: 414003
sessions: Array(2)
0:
available_capacity: 0
date: "18-05-2021"
min_age_limit: 45
session_id: "8f827b29-afc4-44d2-8a6c-a4096a27875e"
slots: (4) ["09:00AM-11:00AM", "11:00AM-01:00PM", "01:00PM-03:00PM", "03:00PM-06:00PM"]
vaccine: "COVISHIELD"
__proto__: Object
1:
available_capacity: 0
date: "19-05-2021"
min_age_limit: 45
session_id: "71e36654-6397-426e-95fd-474b225087f9"
slots: []
vaccine: "COVISHIELD"
__proto__: Object
length: 2
__proto__: Array(0)
state_name: "Maharashtra"
to: "18:00:00"
__proto__: Object
length: 1
__proto__: Array(0)
__proto__: Object
*/