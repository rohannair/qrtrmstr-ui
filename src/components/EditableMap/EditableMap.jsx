import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from '../GoogleMap';
import Marker from '../Marker';
import MapWidget from '../MapWidget';
import styles from './editableMap.css';

class Contents extends React.Component {
  state = {
    place: null,
    position: null,
    googleMap: null,
    updated: false
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps, prevState) {
    const {google} = this.props;
    const {googleMap, position, place} = this.state;
    if (googleMap !== prevState.googleMap) {
      this.renderAutoComplete();
    }
    if (position !== prevState.position) {
      this.props.updateState('position', position);
      this.props.updateState('place', place);
    }
  }

  renderAutoComplete() {
    const {google} = this.props;
    const {googleMap, position} = this.state;
    if (!google || !googleMap) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    let autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', googleMap);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        googleMap.fitBounds(place.geometry.viewport);
      } else {
        googleMap.setCenter(place.geometry.location);
        googleMap.setZoom(13);
      }

      let newPosition = {}, placePos = place.geometry.location;
      newPosition = placePos
      ? {lat: placePos && placePos.lat(), lng: placePos && placePos.lng()}
      : {lat: 43.652644, lng: -79.381769 };
      this.setState({
        place: place,
        position: newPosition
      });

    });
  }

  render() {
    const { mapPos } = this.props;
    const { position, updated } = this.state;
    let newPos = position ? position : mapPos;
    let newPlace = this.state.place
    ? this.state.place
    : this.props.place;

    return (
      <div className="flexWrapper">
        <div className="left">
          <div className="strong">
            <strong>Location:</strong>
          </div>
          <input
            ref='autocomplete'
            type="text"
            onSubmit={this.onSubmit}
            placeholder={newPlace.formatted_address} />
        </div>
        <div className="right">
          <GoogleMap {...this.props}
              className="map"
              updated={updated}
              resetUpdate={this._resetUpdate}
              center={newPos}
              pos={newPos}
              updateMap={this._updateMap}
              centerAroundCurrentLocation={true}>
              <Marker position={newPos} />
              <MapWidget
                place={newPlace}
                google={this.props.google}
                position={this.props.pos} />
          </GoogleMap>
        </div>
      </div>
    );
  }

  _updateMap = (googleMap) => {
    this.setState({
      googleMap: googleMap,
      updated: true
    });
  }
};

class EditableMap extends React.Component {
  render() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Contents {...props} />
    );
  }
};

export default EditableMap;
