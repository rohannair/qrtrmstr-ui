// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';

// Styles
import styles from './survey.css';

class Survey extends Component {

  state = {
    selected: null
  };

  render() {
    const state = this.state;
    const { fields } = this.props;
    const cardFooter = <div className="nextButton"><Button classes={'lgLong primary'}>Next</Button></div>;

    return (
      <div className="survey">
        <Header />

        <div className="container container-survey">
          {
            // TODO: Pull out text card here
            [...fields]
            .filter(val => !val.form)
            .map((val, i) => {
              return (
                <Card key={i} footer={cardFooter}>
                  <h2>{val.heading}</h2>
                  <div
                    className = {val.className || ''}
                    dangerouslySetInnerHTML={{__html: val.body}}
                  />
                </Card>);
            })
          }

          {
            [...fields]
            .filter(val => val.form)
            .map((val, i) => {
              return (
                <Card key={'form' + i} footer={cardFooter}>
                  <h2>{val.heading}</h2>
                  <div className={val.contents.type}>
                  {
                    // TODO: Pull out imageSelector-option here
                    [...val.contents.options].map(({id, imageUri, title, body}) => {
                      const classes = 'imageSelector-option' + (id === state.selected ? ' selected' : '');

                      return (
                        <a
                          key={id}
                          ref={id}
                          className={classes}
                          onClick={this._toggleOption.bind(this, { id, selected: state.selected})}
                        >
                          { imageUri ? <img src={imageUri} /> : <div className="img-placeholder" /> }
                          <h2>{ title }</h2>
                          <p>{ body }</p>
                        </a>
                      );
                    })
                  }
                  </div>
                </Card>
              );
            })
          }
        </div>

        <Footer />

      </div>
    );
  };

  _toggleOption = ({id, selected}) => {
    // TODO: Fix this toggle to be card dependent
    if (id === selected) {
      return this.setState({selected: null});
    }

    return this.setState({selected: id});

  };
}

function select(state) {
  return {
    fields: state.survey.default.survey,
  };
}

export default connect(select)(Survey);
