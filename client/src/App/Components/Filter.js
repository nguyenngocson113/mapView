import React, { Component } from 'react';
import './Filter.scss';
import _ from 'lodash';
import { connect } from "react-redux";
import { setVisibilityFilter } from './../../actions/ActionCreator';
import { bindActionCreators } from "redux";

const STATUS = [
    {
        status: 'Moving',
        number: 84,
        color: '#3abaa9'
    },
    {
        status: 'Out of region',
        number: 1,
        color: '#d77d4d'
    },
    {
        status: 'Offline',
        number: 1,
        color: '#555555'
    },
    {
        status: 'Parked',
        number: 15,
        color: '#0071ca'
    },
    {
        status: 'Idling',
        number: 8,
        color: '#3a33a7'
    }
];
class Filter extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        showAll: true
    };

    _renderConditions(name, number, index, color) {
        const {list} = this.props;
        const numberItems = _.filter(list, (item) => { 
            if (item.status.title === name) return item;
        }).length;
        return (
            <div key={index} className="pill" 
                style={{borderColor: color}} 
                onClick={() => this.props.setVisibilityFilter(name)}>
                {name}
                <div className="number" style={{backgroundColor: color}}>{numberItems}</div>
            </div>
        );
    }

    _handleCheck() {
        const name = this.state.showAll ? 'none' : 'showAll';
        this.props.setVisibilityFilter(name);
        this.setState({
            showAll: !this.state.showAll
        });
    }

    render() {
        const {list} = this.props;
        return (
            <div className="Filter">
                <div className="checkbox">
                    <input type="checkbox" 
                        onChange={() => {this._handleCheck()}} 
                        defaultChecked={true}
                    />
                    <span>Show all {list.length} cars</span>
                </div>              
                {STATUS.map((item, index) => {
                    const {status = '', number = 0, color = ''} = item;
                    return this._renderConditions(status, number, index, color)
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      visibilityFilter: state.visibilityFilter
    };
  };
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {setVisibilityFilter},
        dispatch
    );
};

  export default connect(mapStateToProps, mapDispatchToProps)(Filter);
