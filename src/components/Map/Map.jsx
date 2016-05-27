// Deps
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './map.css';

class Map extends Component {

  state = {
    currentLocation: {
      lat: this.props.pos.lat || this.props.initialCenter.lat,
      lng: this.props.pos.lng || this.props.initialCenter.lng
    },
    editing: this.props.editing,
    map: null,
    google: this.props.google || null
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
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
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
      let newMap = new maps.Map(node, newConfig);
      this.setState({
        map: newMap
      });
      if (this.props.updateMap) {
        if (this.props.updated === false) {
          this.props.updateMap(newMap);
        };
      };
    };
  };

  renderChildren() {
    const {children} = this.props;
    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.state.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  };

  render() {
    return (
      <div ref='map' className="map">
        Loading map...
        {this.renderChildren()}
      </div>
    );
  };
};

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
};

Map.defaultProps = {
  zoom: 13,
  // Toronto, by default
  initialCenter: {
    lat: 43.652644,
    lng: -79.381769
  }
};

export default Map;
