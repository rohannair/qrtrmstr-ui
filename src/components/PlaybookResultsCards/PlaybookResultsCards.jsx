import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

// Components
import Button from '../Button';
import Card from '../Card';
import PlaybookTextCard from '../PlaybookTextCard';
import PlaybookKnowledgeCentre from '../PlaybookKnowledgeCentre';
import MapContainer from '../../containers/MapContainer';
import styles from './playbookResultsCards.css';


const PlaybookResultsCards = (props) => {

  const { totalCards, userInfo, view } = props;
  const cards = Object.keys(totalCards).map((val) => {

    let field = totalCards[val];
    let fieldOptions = field.body.options;

    switch (field.type) {

    case 'bio':

      const facebookSoc = Object.keys(fieldOptions).indexOf('facebook') > -1
      ? <div className="socMedia">
          <div className="iconBox fb">
            <i className="fa fa-facebook"></i>
          </div>
          <p>{fieldOptions.facebook}</p>
       </div>
      : null;

      const twitterSoc = Object.keys(fieldOptions).indexOf('twitter') > -1
      ? <div className="socMedia">
          <div className="iconBox tw">
            <i className="fa fa-twitter"></i>
          </div>
          <p>{fieldOptions.twitter}</p>
       </div>
      : null;

      const linkedinSoc = Object.keys(fieldOptions).indexOf('linkedin') > -1
      ? <div className="socMedia">
          <div className="iconBox li">
            <i className="fa fa-linkedin"></i>
          </div>
          <p>{fieldOptions.linkedin}</p>
       </div>
      : null;

      const socialSoc = (facebookSoc || twitterSoc || linkedinSoc)
      ? (
        <div className="social-media">
          { facebookSoc }
          { twitterSoc }
          { linkedinSoc }
        </div>
      )
      : null;

      return (
        <Card key={ field.slide_number } footer={<div/>}>
          <h2>{field.body.heading}</h2>
          <div>
            <div className="profileImage">
              <img src={ fieldOptions.profile_image.url } />
            </div>
            { fieldOptions.bio }
            <div className="profileDesc">
              { socialSoc }
            </div>
          </div>
        </Card>
      );

    case 'equipment':
      const opts = fieldOptions.map((val, ind) => {

        return (
          <div key={val.id} className="equipment-choice">
            <span>{val.name + ': ' + fieldOptions[ind].optNames }</span>
          </div>
        );
      });

      return (
        <Card key={field.slide_number} footer={<div/>}>
          <h2>{field.heading}</h2>
          <div className="equipment-form">
            { opts }
          </div>
        </Card>
      );

    case 'knowledgectr':
      return (
        <Card key={field.slide_number} footer={<div/>}>
          <PlaybookKnowledgeCentre { ...field } />
        </Card>
      );

    case 'day1agenda':
      const agenda = field.body.agenda.map((val, i) => {
        return (
          <div className="agendaItem" key={`agendaItem-${i}`}>
            <span className="agendaItem-time">{moment(val.startTime).format('h:mm')} - {moment(val.finishTime).format('h:mm A')}</span>
            <span className="agendaItem-desc">{val.desc}</span>
          </div>
        );
      });

      const dirLoc = `https://www.google.com/maps/dir/Current+Location/${field.position.lat},${field.position.lng}`;

      const couponCode = field.couponInput.show
      ? <div className="uber-promo">
          Complimentary UBER Code
          <strong>{ field.couponInput.code}</strong>
        </div>
      : null;

      return (
        <Card key={field.slide_number} footer={<div/>}>
          <h2>{field.heading} - <span>{moment(field.date).format("MMMM D YYYY")}</span></h2>
          <div className="day1-body">
            <div className="day1-map">
              <div className="mapContainerDiv">
                <div className="mapDiv">
                  <MapContainer
                    className="day1-body"
                    place={field.place}
                    editing={false}
                    pos={field.position}
                  />
                </div>
              </div>
              <div className="day1-map mapDesc">
                <div className="day1-item">
                  <i className="material-icons">location_on</i>
                  { field.detailed_location }
                  <a href={ dirLoc }> Get Directions</a>
                </div>
                <div className="day1-item">
                  <i className="material-icons">person</i>
                  { field.contact.title } - {field.contact.name}
                </div>
                <div className="day1-item">
                  <i className="material-icons">mail</i>&nbsp;
                  <a href={`mailto:${field.contact.email}`}>{field.contact.email}</a>
                </div>
                { couponCode }
              </div>
            </div>
            <div className="day1-agenda">
              <div className="header">
                Agenda
              </div>
              { agenda }
            </div>
          </div>
        </Card>
      );


    case 'intro':
      const introFilled = {
        ...field,
        heading: field.heading.replace('\${user}', userInfo.first_name).replace('Scotia Bank', 'Scotiabank')
      };
      return <PlaybookTextCard key={field.slide_number} {...introFilled} />;
    default:
      return null;
    }
  });

  return (
    <div className="PlaybookResultsCards">
      { cards }
    </div>
  );

};

export default PlaybookResultsCards;
