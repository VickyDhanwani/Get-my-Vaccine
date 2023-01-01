import React from 'react'

class SearchByPin extends React.Component {
    
    pincodeChange = (e) => {
        this.props.updatePincode(e.target.value);
    }
    
    render() {
        return(
            <div>
                <label>Enter Pin : </label>
                
                <input type = "text" name = "PIN" onChange = {this.pincodeChange}/>
            </div>
        );
    }
}

export default SearchByPin