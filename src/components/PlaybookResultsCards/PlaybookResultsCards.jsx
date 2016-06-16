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

    switch (field.type) {

    case 'bio':

      const socLinks = ['facebook', 'twitter', 'linkedin'].map(val => {
        const socClass = val.slice(0,2);
        return Object.keys(field.body.options).indexOf(val) > -1
        ? <div key={val} className="socMedia flexSocCon">
            <div className={`iconBox ${socClass}`}>
              <i className={`fa fa-${val}`}></i>
            </div>
            <a href={field.body.options[val]}><p>{field.body.options[val]}</p></a>
         </div>
        : null;
      });

      const socialSoc = socLinks
      ? (
        <div className="social-media flexSocCon">
          { socLinks }
        </div>
      )
      : null;

      return (
        <Card key={ field.slide_number } footer={<div/>}>
          <div className="bio-results">
            <h2>{field.body.heading}</h2>

            <div className="profileImage">
              <img src={ field.body.options.profile_image.url } />
            </div>
            <div className="body">
              <div className="profileDesc">
                <strong>Biography:</strong>
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
            <span>{val.name + ': ' + field.body.options[ind].optNames }</span>
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
        heading: field.heading.replace('\${user}', userInfo.firstName).replace('Scotia Bank', 'Scotiabank')
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
