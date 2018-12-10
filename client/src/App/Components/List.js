import React, { Component } from 'react';
import './List.scss';
import classNames from 'classnames';
import { connect } from "react-redux";
import { selectCar } from './../../actions/ActionCreator';
import { bindActionCreators } from "redux";
const PAGE_SIZE = 7;
class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
  }

  state = {
    pageNumber: 1
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      pagesTotal:  Math.floor(nextProps.list.length/PAGE_SIZE) + 1
    });
}

  _getItemPage(list) {
    const {pageNumber} = this.state;
    const indexStart = (pageNumber - 1) * PAGE_SIZE;
    const indexEnd = pageNumber * PAGE_SIZE;
    return list.slice(indexStart, indexEnd);
  }

  _renderList(list) {

    return (
      <div>
        <ul className= "title">
          <li className="name">Name</li>
          <li className="license">License Plate</li>
        </ul>
        <div className="table">
        <ul>
        { 
          list.map((item, index) => {
            const isEven = (index%2) === 0 ? true : false;
            const className = classNames({
              row: true,
              'row-even': isEven
            });
            const { name, license } = item;
            return (
                <li key={index} className={className} onClick={() => this.props.selectCar(item)}>
                  <span className="row-name">{name}</span>
                  <span className="row-license">{license}</span>
                </li>
            );
          })
        }
        </ul>

        </div>
      </div>
    )
  }

  _clickPage(pageNumber) {
    this.setState({pageNumber});
  }

  _previous() {
    const {pageNumber} = this.state;
    this.setState({
      pageNumber: pageNumber-1
    });

  }

  _next() {
    const {pageNumber} = this.state;
    this.setState({
      pageNumber: pageNumber+1
    });

  }

  _pagination(length) {
    const { pageNumber } = this.state;
    const pagesTotal = length%PAGE_SIZE !== 0 ? Math.floor(length/PAGE_SIZE) + 1 : Math.floor(length/PAGE_SIZE);
    const pages = [];
    for (let i = 1; i <= pagesTotal; i++) {
      const classnames = classNames({
        active: (i === pageNumber),
      });
      pages.push(<a className={classnames} key={i} onClick={() => this._clickPage(i)}> {i} </a>);
    }
    return pages;
  }

  render() {
    const { list } = this.props;
    const showedItems = this._getItemPage(list);
    return (
      <div className="List">
        {showedItems.length ? this._renderList(showedItems): (
            <div>
              <h2>No List Items Found</h2>
            </div>
          )
        }
        <div className="pagination"> 
          <div>
            <a className="navigation" onClick={() => this._previous()}>«</a>
            
            {this._pagination(list.length)}
            
            <a className="navigation" onClick={() => this._next()}>»</a>
            
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectCar: state.selectCar
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {selectCar},
      dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
