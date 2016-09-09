// Deps
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './googleMap.css';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        lat: this.props.pos.lat || this.props.initialCenter.lat,
        lng: this.props.pos.lng || this.props.initialCenter.lng
      },
      editing: this.props.editing,
      googleMap: null,
      google: this.props.google || null
    };
  }

  static defaultProps = {
    pos: {
      lat: ''
    }
  };

  componentDidMount() {
    this.loadMap();
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.editing === true) {
      if (nextProps.pos !== this.state.currentLocation) {
        this.setState({
          currentLocation: {
            lat: nextProps.pos.lat,
            lng: nextProps.pos.lng
          }
        });
      };
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.loadMap();
    } if (prevProps.google !== this.props.google) {
      this.loadMap();
    };
  };

  loadMap() {
    if (this.props && this.state.google) {
      // google is available
      const {google} = this.state;
      const googleMaps = google.maps;

      const mapRef = this.refs.googleMap;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new googleMaps.LatLng(lat, lng);
      const newConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      let newMap = new googleMaps.Map(node, newConfig);
      this.setState({
        googleMap: newMap
      });
      if (this.props.updateMap) {
        if (this.props.updated === false) {
          this.props.updateMap(newMap);
        };
      };
    };
  };

  _renderChildren = () => {
    const {children} = this.props;
    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        googleMap: this.state.googleMap,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  };

  render() {
    const children = this._renderChildren();
    return (
      <div ref='googleMap' className="map">
        Loading map...
        { children }
      </div>
    );
  };
};

GoogleMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
};

GoogleMap.defaultProps = {
  zoom: 13,
  // Lighthouse Labs, by default
  initialCenter: {
    lat: 43.6446447,
    lng: -79.39499869999997
  }
};

export default GoogleMap;
