import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MostVisitedRow extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='most-visited-row'>
                {this.props.children}
            </div>
        );
    }
}

MostVisitedRow.propTypes = {
    style: PropTypes.object
}

MostVisitedRow.defaultProps = {
    style: {}
}


export default MostVisitedRow;
