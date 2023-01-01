import React from 'react'

class SearchByDistrict extends React.Component {
    
    districtChange = (e) => {
        this.props.updateDistrict(e.target.value)
    }

    render() {
        return(
            <div>
                <label>Enter District : </label>
                
                <input type = "text" name = "District" onChange = {this.districtChange}/>
            </div>
        );
    }
}

export default SearchByDistrict