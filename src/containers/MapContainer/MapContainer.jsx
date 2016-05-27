// Deps
import React from 'react';
import GoogleApiComponent from '../../vendor/googleMapApi/GoogleApiComponent';
import Map from '../../components/Map';
import Marker from '../../components/Marker';
import MapWidget from '../../components/MapWidget';
import styles from './mapContainer.css';
import EditableMap from '../../components/EditableMap';

export class MapContainer extends React.Component {

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    };

    if (this.props.editing === true) {
      return (
        <div className='mapContainer' >
          <EditableMap
            updateState={this.props.updateState}
            className="day1-body"
            google={this.props.google}
            mapPos={this.props.pos}
            place={this.props.place}
            editing={this.props.editing} />
        </div>
      );
    };

    return (
      <div className='mapContainer' >
        <Map google={this.props.google}
          place={this.props.place}
          pos={this.props.pos}
          editing={this.props.editing}>
          <Marker position={this.props.pos} />
          <MapWidget
            place={this.props.place}
            google={this.props.google}
            position={this.props.pos} />
        </Map>
      </div>
    );
  };
};

export default GoogleApiComponent({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer);
