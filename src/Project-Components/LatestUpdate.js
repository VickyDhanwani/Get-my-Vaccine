import React from 'react'

class LatestUpdate extends React.Component {
    
    render() {
        var rowwiseUpdates = [];
        if(this.props.latestFetchedData.length == 0) {
            if(this.props.dataFetching === false) {
                rowwiseUpdates.push(<div className = "unavailability-update">Please Start refreshing to fetch updates</div>);
            
            }
            else {
                rowwiseUpdates.push(<div className = "unavailability-update">Currently No Center is available</div>);
            
            }
            
        }
        else {
            this.props.latestFetchedData.forEach(elem => {
                if(elem.availableCapacity > 0) {
                    rowwiseUpdates.push(<div className = "availability-update"> No Doses available at {elem.centerName} 
                      on {elem.dateOfAvailability}
                    </div>);
                  }
                  else {
                    rowwiseUpdates.push(<div className = "availability-update"> {elem.availableCapacity} Doses available 
                    at {elem.centerName}  
                    on {elem.dateOfAvailability}
                    </div>);
                  }
                });
            
        }
        return(
            <div className = "latest-updates">
                {rowwiseUpdates}
            </div>
        );
    }
}

export default LatestUpdate;