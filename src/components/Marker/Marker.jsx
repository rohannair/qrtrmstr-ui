import React from 'react';

class Marker extends React.Component {

  componentDidUpdate(prevProps) {
    debugger;
    if ((this.props.googleMap !== prevProps.googleMap) ||
      (this.props.position !== prevProps.position)) {
      this.renderMarker();
    };
  };

  renderMarker() {
    debugger;
    let {
      googleMap, google, position, mapCenter
    } = this.props;
    debugger;
    let pos = position || mapCenter;
    let newPosition = new google.maps.LatLng(pos.lat, pos.lng);
    const pref = {
      map: googleMap,
      position: newPosition
    };
    this.marker = new google.maps.Marker(pref);
  };

  render() {
    return null;
  };
};

Marker.propTypes = {
  position: React.PropTypes.object,
  googleMap: React.PropTypes.object
};

export default Marker;
