import React, { Component } from 'react';
import './App.scss';
import Map from './Components/Map';
import Filter from './Components/Filter';
import List from './Components/List';
import { connect } from 'react-redux';
import {DRAFT} from './constant';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
      filter: 'showAll'
  };
  _filterData() {
    const {filter} = this.props;
    return (filter === 'showAll' || filter === '') ? DRAFT : _.filter(DRAFT, (item) => {return item.status.title === filter} );
  }

  render() {
    const {
        selectCar: {
          coordinates
        },
        selectCar,
        filter
    } = this.props;
    return (
      <div className="App">
        <Filter filter={filter} list={DRAFT}></Filter>
        <List list={this._filterData()}></List>
        <Map coordinates={coordinates} list={this._filterData()} car={selectCar}></Map>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);