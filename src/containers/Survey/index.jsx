import React, { PropTypes } from 'react';

import styles from './survey.css';

export default class Survey extends React.Component {
  render() {
    return (
      <div className="container container-survey">
        <h1>What type of stuff do you want?</h1>

        <form>
          <div className="card">
            <h2 className="card--header">
              Main
              <span className="card--header-caption">Lorem ipsum dolor sit amet.</span>
            </h2>
            <div className="card--body">
              <label>Name: <input type="text" /></label>
              <label>Email: <input type="email" /></label>
              <label>Phone Number: <input type="phone" /></label>
            </div>
          </div>

          <div className="card">
            <h2 className="card--header">
              OS Preference
              <span className="card--header-caption"></span>
            </h2>
            <div className="card--body">
              <label><input name="os" type="radio" />OS X 10.11</label>
              <label><input name="os" type="radio" />Linux</label>
              <label><input name="os" type="radio" />Windows</label>
            </div>
          </div>

          <div className="card">
            <h2 className="card--header">
              Equipment Preference
              <span className="card--header-caption"></span>
            </h2>
            <div className="card--body">
              <label><input name="equipment" type="radio" />Apple MacBook Air</label>
              <label><input name="equipment" type="radio" />Apple MacBook Pro Retina 13"</label>
              <label><input name="equipment" type="radio" />Apple MacBook Pro Retina 15"</label>
            </div>
          </div>

          <div className="card">
            <h2 className="card--header">
              External Monitors
              <span className="card--header-caption"></span>
            </h2>
            <div className="card--body">
              <label><input name="monitors" type="radio" />Apple Cinema Display</label>
              <label><input name="monitors" type="radio" />Dell Ultrasharp</label>
            </div>
          </div>

          <div className="card">
            <h2 className="card--header">
              Software
              <span className="card--header-caption"></span>
            </h2>
            <div className="card--body">
              <label>IDE/Text Editor:</label>
              <select>
                <option>Please select...</option>
                <option>Atom</option>
                <option>IntelliJ IDEA</option>
                <option>Sublime Text 3</option>
                <option>Webstorm</option>
              </select>
            </div>
          </div>
        </form>

      </div>
    );
  }
}
