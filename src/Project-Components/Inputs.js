import React from 'react'
import SearchByPin from './SearchByPinForm'
import SearchByDistrict from './SearchByDistrictForm'


class CommonForm extends React.Component {
    togglePreference = (e) => {
        
        e.target.checked = true;
        if(e.target.value === "ByPin" || e.target.value === "ByDistrict") {
            this.props.updateSearchPreference(e.target.value);
        }
        else if(e.target.value === "18-45" || e.target.value === "45+") {
            this.props.updateAgeGroup(e.target.value);
        }
        
    }

    updateDate = (e) => {
        this.props.updateDateString(e.target.value);
    }

    updateEmailHere = (e) => {
        this.props.updateEmail(e.target.value);
    }
    render() {
        return (<div>
                <div>
                    <label>Select Search Preference :</label>
                    <br/>
                    <input type = "radio" id = "ByPin" value = "ByPin" name = "search-preference"  onClick = {this.togglePreference}/>
                    <label for = "ByPin">Search by Pin</label>
                    <br/>
                    <input  type = "radio"  id = "ByPin" value = "ByDistrict" name = "search-preference"  onClick = {this.togglePreference}/>
                    <label for = "ByDistrict">Search by District Name</label>
                </div>
                <br/>
                <div>
                    <label>Select Age Group :</label>
                    <br/>
                    <input type = "radio" id = "18-45" value = "18-45" name = "age-group"  onClick = {this.togglePreference}/>
                    <label for = "18-45">18 - 45</label>
                    <br/>
                    <input type = "radio" id = "45+" value = "45+" name = "age-group" onClick = {this.togglePreference}/>
                    <label for = "45+">45+</label>
                </div>
                <br/>
                <div>
                    <label>Enter Email : </label>
                    <input type = "text" name = "useremail" placeholder = "name@example.com" onChange = {this.updateEmailHere}/>
                </div>
                <br/>
                <div>
                    <label>Enter Date : </label>
                    <input type = "text" name = "startDate" placeholder = "dd-mm-yyyy" onChange = {this.updateDate}/>
                </div>
        </div>);
    }
}

class InputForm extends React.Component {
    state = {
        searchPref : "ByPin",

        ageGroup : "18-45"
    }
    updateSearchPreference = (preference) => {
        this.setState({ searchPref : preference });
        this.props.updateSearchPreference(preference);
    }

    updateAgeGroup = (group) => {
        this.setState({ageGroup : group});
        this.props.updateAgeGroup(group);
    }
    render() {
        if(this.state.searchPref === "ByPin") {
            return (
                <div>
                    <form>
                        <br/>
                        <CommonForm searchPref = {this.state.searchPref} 
                        updateSearchPreference = {this.updateSearchPreference}
                        updateAgeGroup = {this.updateAgeGroup}
                        updateDateString = {this.props.updateDateString}
                        updateEmail = {this.props.updateEmail}
                        />
                        <br/>
                        <SearchByPin 
                            updatePincode = {this.props.updatePincode}
                        />
                    </form>       
                </div>
            );
        }
        else if(this.state.searchPref === "ByDistrict") {
            return (
                <div>
                    <form>
                        <br/>
                        <CommonForm searchPref = {this.state.searchPref} 
                        updateSearchPreference = {this.updateSearchPreference}
                        updateAgeGroup = {this.updateAgeGroup}
                        updateDateString = {this.props.updateDateString}
                        updateEmail = {this.props.updateEmail}
                        />
                        <br/>
                        <SearchByDistrict 
                            updateDistrict = {this.props.updateDistrict}
                        />
                    </form>
                </div>
            );
        }
    }
}
export default InputForm