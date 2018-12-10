import React, { Component } from 'react';
import classNames from 'classnames';
import GoogleMapReact from 'google-map-react';
import './Map.scss';
import car from '../icon/59913-car-icon-vector.svg'

export default class Map extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        coordinates: {
            lat: 10.880511,
            lng: 106.773379
        },
        car: {}
    };

    state = {
        coordinates: {
            lat: 10.880511,
            lng: 106.773379
        },
        onPopupIndex: -1,
        offPopupIndex: -1
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
          coordinates: {
            lat: nextProps.coordinates.lat,
            lng: nextProps.coordinates.lng,
          }
        });
    }

    _openPopup(key) {
        const {onPopupIndex} = this.state;
        const index = key === onPopupIndex ? -1 : key;
        this.setState({onPopupIndex: index, offPopupIndex: -1});
    }

    _closePopup(key) {
        this.setState({offPopupIndex: key});
    }

    render() {
        const {
            list,
            coordinates: propCoorinates
        } = this.props;
        const {
            coordinates,
            onPopupIndex,
            offPopupIndex
        } = this.state;
        return (
            <div className="Map" style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDW1MnfZm9vGspGNnoxRoh0gUmi4NRf_0o' }}
                    defaultCenter={propCoorinates}
                    defaultZoom={15}
                    center={coordinates}
                >
                    {list.map((item, key) => {
                        const {coordinates: {lat = lat, lng = lng}} = item;
                        return(
                            <Maker
                                lat={lat}
                                lng={lng}
                                info={item}
                                key={key}
                                index={key}
                                onPopupIndex={onPopupIndex}
                                offPopupIndex={offPopupIndex}
                                _open={(key) => this._openPopup(key)}
                                _closePopup={(key) => this._closePopup(key)}
                            >
                            </Maker>
                        )
                    })}

                </GoogleMapReact>
            </div>
        );
    }
}

class Maker extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        show: false
    };

    componentWillReceiveProps(nextProps) {
        const {onPopupIndex, index, offPopupIndex} = nextProps;
        this.setState({show: (onPopupIndex === index && offPopupIndex !== index)})
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {show} = this.state;
        return nextState.show !== show;
    }

    _openPopup(key) {
        this.props._open(key);
    }

    _closePopup(key) {
        this.props._closePopup(key);
    }
    
    render() {
        const {
            info: {
                license = '',
                status: {
                    title = '',
                    description = ''
                } = {},
                name = '',
                speed = '',
                location = '',
                direction = '',
                time = '',
                address = ''
            } = {},
            index
        } = this.props;
        const {
            show
        } = this.state;
        const markerClass = classNames({
            Marker: true,
            'Marker-show': show
        });

        return (
            <div className={markerClass}>
                <img onClick= {() => {this._openPopup(index)}}  src={car} alt="car"></img>
                {show ? 
                <div className="Popup"> 
                    <a className="close" onClick= {(() => {this._closePopup(index)})}></a>
                    <div className="info">
                        <div className="user">
                            <p className="user-strong">{license}</p>
                            <p className="user-strong">{name}</p>
                            <p>
                                <span className="address">{address}</span>
                                <span className="time">{time}</span>
                            </p>
                        </div>
                        <div className="car">
                            <div className="wrapper">
                                <div className="wrapper-title">LOCATION</div>
                                <div>{location}</div>
                            </div>
                            <div className="wrapper">
                                <div className="wrapper-title">STATUS</div>
                                <div className="wrapper-status">
                                    <p>{title}</p>
                                    <p>{description}}</p>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="wrapper-title">SPEED</div>
                                <div>{speed}</div>
                            </div>
                            <div className="wrapper">
                                <div className="wrapper-title">DIRECTION</div>
                                <div>{direction}</div>
                            </div>
                        </div>
                    </div>
                </div> 
                : 
                ''}
            </div>
        )
    }
}
