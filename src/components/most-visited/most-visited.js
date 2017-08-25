import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chrome from '../../chrome';
import MostVisitedRow from './most-visited-row';
import MostVisitedItem from './most-visited-item';


class MostVisited extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            topSites: null,
            maxItemsInRow: 4,
            rows: 2
        };
    }

    componentWillMount() {
        this.setTopSites();
    }

    setTopSites() {
        Chrome.getTopSites().then(topSites =>{
            this.setState({ topSites });
        });
    }

    getMaxElementsInRow() {

    }

    parseSites() {
        const items = [];
        for (var i = 0; i < this.state.rows; i++) {
            const start = i * this.state.maxItemsInRow;
            const end = (i + 1) * this.state.maxItemsInRow;
            items.push(this.state.topSites.slice(start,end));
        }
        return items;
    }


    render() {
        if (!this.state.topSites) {
            return null;
        }
        const rows = this.parseSites();
        const elements = rows.map((row, rowIdx) => {

            const itemInRow = row.map((item, itemIdx) => {
                return <MostVisitedItem map={this.props.map} title={item.title} url={item.url} key={itemIdx}/>
            });

            return (
                <MostVisitedRow key={rowIdx}>
                    {itemInRow}
                </MostVisitedRow>
            )
        });

        return (
            <div>
                {elements}
            </div>
        );
    }
}

MostVisited.propTypes = {
    map: PropTypes.object.isRequired,
};

export default MostVisited;
