import React from 'react'

class FilteredDataTable extends React.Component {
    render() {
        var rows = [];
        var i = 1;
        var data = this.props.filteredData.reverse();
        data.forEach( elem => {
            rows.push(
                <tr id = {i}>
                    <td>
                        {i}
                    </td>
                    <td>
                        {elem.district}
                    </td>
                    <td>
                        {elem.pincode}
                    </td>
                    <td>
                        {elem.centerName}
                    </td>
                    <td>
                        {elem.feeType}
                    </td>
                    <td>
                        {elem.vaccineType}
                    </td>
                    <td>

                        {elem.agelimit}
                    </td>
                    <td>
                        {elem.availableCapacity}
                    </td>
                    <td>
                        {elem.dateOfAvailability}
                    </td>
                    <td>
                        {elem.refreshTimestamp}
                    </td>
                </tr>
            );
            
            i++;
        });
        return (
            <div className = "filtered-details-table">
                <table>
                    <tr id = "header">
                        <th>
                            ID
                        </th>
                        <th>
                            District
                        </th>
                        <th>
                            Pincode
                        </th>
                        <th>
                            Center
                        </th>
                        <th>
                            Fee Type
                        </th>
                        <th>
                            Vaccine Type
                        </th>
                        <th>
                            Minimum Age
                        </th>
                        <th>
                            Available
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Last Refreshed
                        </th>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}

export default FilteredDataTable;