import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './mapWidget.css';

class MapWidget extends Component {

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.place !== prevProps.place)) {
      this.renderWidget();
    };
  };

  renderWidget() {
    let {
      map, google, place, position
    } = this.props;
    const mapRef = this.refs.widget;
    const widgetDiv = ReactDOM.findDOMNode(mapRef);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(widgetDiv);
  };

  render() {
    return (
      <div className="widget" ref='widget'>
        <strong>{this.props.place.name}</strong>
        <div className="information">
          {this.props.place.formatted_address}
        </div>
      </div>
    );
  };
};

export default MapWidget;
