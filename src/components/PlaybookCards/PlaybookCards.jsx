import React from 'react';
import classnames from 'classnames';
import styles from './playbookCard.css';
import moment from 'moment';

// Containers
import Uploader from '../../containers/Uploader';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';
import PlaybookFormCard from '../../components/PlaybookFormCard';
import PlaybookTextCard from '../../components/PlaybookTextCard';
import PlaybookKnowledgeCentre from '../../components/PlaybookKnowledgeCentre';
import PlaybookBio from '../../components/PlaybookBio';
import MapContainer from '../../containers/MapContainer';

// Mock
const userInfo = {
  firstName: 'JerKhurram',
  lastName: 'Shakirani'
};

const PlaybookCards = (props) => {

  const { fields, onClick, onSubmit, selected } = props;
  const cardCount = Object.keys(fields).map(val => {
    const field = fields[val];
    const classes = classnames('progressbar-item', {done: val == 0});

    return <div className={classes} key={field.slide_number}><span /></div>;
  });

  const cards = Object.keys(fields).map((val) => {
    let field = fields[val];

    switch (field.type) {
    case 'option':
      let isSelected = selected ? selected[field.slide_number] : null;
      return (<PlaybookFormCard
        key = { field.slide_number }
        onClick = { clickHandler(field.slide_number, onClick) }
        selected = { isSelected }
        {...field}
      />);

    case 'bio':
      const { slideKey } = props.findSlideKey(field.slide_number);
      const submittedPic = props.submittedDoc[slideKey].body.options.profile_image;
      const savedPic = submittedPic && submittedPic.url ? submittedPic : null;
      const ImageUploader = (<Uploader updateState={ props.onChange } savedImg={ savedPic } slideKey={ slideKey } ><i className="material-icons">cloud_upload</i></Uploader>);
      // const Uploader = <Uploader updateSubDoc={ props.onChange } savedImg={ savedPic } slideKey={ slideKey }></Uploader>;

      return (
        <Card key={ field.slide_number } footer={<div/>}>
          <PlaybookBio
            { ...field }
            img={ props.img }
            savedPic={ savedPic }
            updateImage={ props.updateImage}
            onSubmit={ props.onSubmit }
            userInfo={ userInfo }
            onChange={ props.onChange }
            submittedDoc={ props.submittedDoc }
            findSlideKey={ props.findSlideKey }>
            { ImageUploader }
          </PlaybookBio>
        </Card>
      );

    case 'equipment':
      const { submittedDoc, onEquipChange, onSubmit } = props;
      const opts = field.body.options.map((val, ind) => {

        const options = val.opts.map((opt, i) => {
          const optValue = JSON.stringify({opts: opt, optNames: val.optNames[i]});
          return <option value={optValue} key={opt}>{val.optNames[i]}</option>;
        });

        const { slide, slideKey } = props.findSlideKey(field.slide_number);

        const currentValue = JSON.stringify(slide.body.options[ind].opts.length > 0
        ? { opts: slide.body.options[ind].opts, optNames: slide.body.options[ind].optNames }
        : '');
        return (
          <div key={val.id} className="equipment-choice">
            <span>{val.name + ':'}</span>
            <select value={ currentValue } onChange={e => onEquipChange(field.slide_number, val.id, (JSON.parse(e.target.value)))}>
            <option value=''></option>
            { options }
            </select>
          </div>
        );
      });

      return (
        <Card key={field.slide_number} footer={<div/>}>
          <h2>{field.heading}</h2>
          <p className = {field.body.textAlign || ''}>{field.body.desc}</p>
          <div className="equipment-form">
            { opts }
          </div>
          <div className="slideFooter">
            <Button classes="primary sm equipSub" onClick={onSubmit}>Submit</Button>
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
    <div className="container container-playbook">
      { cards }
    </div>
  );
};

const clickHandler = (id, cb) => val => cb({key: id, val});

export default PlaybookCards;
