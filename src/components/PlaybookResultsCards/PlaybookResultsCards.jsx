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

  const { totalCards, view, validateLink } = props;
  const cards = Object.keys(totalCards).map((val) => {

    let field = totalCards[val];

    switch (field.type) {

    case 'bio':
      const socLinks = ['facebook', 'twitter', 'linkedin'].map(val => {
        const socClass = val.slice(0,2);
        if (Object.keys(field.body.options).indexOf(val) > -1) {
          const valSoclink = validateLink(field.body.options[val]);
          return (
            <div key={val} className="socMedia flexSocCon">
              <div className={`iconBox ${socClass}`}>
                <i className={`fa fa-${val}`}></i>
              </div>
              <a href={valSoclink}><p>{field.body.options[val]}</p></a>
            </div>
          );
        }
        return null;

      });

      const socialSoc = socLinks
      ? (
        <div className="social-media flexSocCon">
          { socLinks }
        </div>
      )
      : null;

      const profileImage = field.body.options.profile_image
      ? <div className="profileImage"><img src={ field.body.options.profile_image.url  } /></div>
      : null

      return (
        <Card key={ field.slide_number } title={field.body.heading}>
          <div className="bio-results">
            { profileImage }
            <div className="body">
              <div className="profileDesc">
                <strong>Input:</strong>
                { field.body.options.bio }
              </div>
              <div className="socialMedia">
                { socialSoc }
              </div>
            </div>
          </div>
        </Card>
      );

    case 'equipment':
      const opts = field.body.options.map((val, ind) => {

        return (
          <div key={val.id} className="equipment-choice">
            <span>{val.name + ': '}</span>
            { field.body.options[ind].optNames }
          </div>
        );
      });

      return (
        <Card key={field.slide_number} title={field.heading}>
          <div className="equipment-form">
            { opts }
          </div>
        </Card>
      );

    case 'knowledgectr':
      return (
        <Card key={field.slide_number}>
          <PlaybookKnowledgeCentre { ...field } />
        </Card>
      );

    case 'day1agenda':
      const agenda = field.body.agenda.map((val, i) => {
        return (
          <div className="agendaItem" key={`agendaItem-${i}`}>
            <span className="agendaItem-time">{moment(val.startTime).format('MMM Do')}</span>
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
        <Card key={field.slide_number}>
          <h2>{field.heading} - <span>{moment(field.date).format('MMMM D YYYY')}</span></h2>
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
                  <a href={ dirLoc }>Get Directions</a>
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
      return <PlaybookTextCard key={field.slide_number} {...field} />;
    default:
      return null;
    }
  });

  return (
    <div className="playbookResultsCards">
      { cards }
    </div>
  );

};

export default PlaybookResultsCards;
