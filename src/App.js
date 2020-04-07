// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startingYear: '2016',
            endingYear: '2016',
            startingMonth: '01',
            endingMonth: '01',
            startingDay: '01',
            endingDay: '31'
        }
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    getStartingDate() {
        return this.state.startingYear + '-' + this.state.startingMonth + '-' + this.state.startingDay;
    }

    getEndingDate() {
        return this.state.endingYear + '-' + this.state.endingMonth + '-' + this.state.endingDay;
    }

    onMonthSelectChange = (event) => {
        this.setState({
            startingMonth: event.target.value,
            endingMonth: event.target.value,
            endingDay: this.daysInMonth(event.target.value, this.state.endingYear)
        }, function() {console.log(this.state);});
    };

    getMonthFilter() {
        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: this.getStartingDate(),
                to: this.getEndingDate()
            }

        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    renderDropdown() {
        return (
            <select onChange={this.onMonthSelectChange} defaultValue="1">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        )
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getMonthFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;
