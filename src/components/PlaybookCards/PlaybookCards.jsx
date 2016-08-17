import React from 'react';
import classnames from 'classnames';
import styles from './playbookCard.css';
import moment from 'moment';
import groupBy from 'lodash/groupBy';

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

const PlaybookCards = (props) => {

  const {
    onClick,
    findSlideKey,
    onSubmit,
    uploaderFn,
    selected,
    playbook,
    onEquipChange,
    onChange } = props;
  const fields = playbook.doc ? playbook.doc : {};
  const submittedDocProp = playbook.submitted_doc
  ? playbook.submitted_doc
  : null;

  const submitAction = submittedDocProp ? onSubmit : null;
  const cardCount = Object.keys(fields).map(val => {
    const field = fields[val];
    const classes = classnames('progressbar-item', {done: val == 0});

    return <div className={classes} key={field.slide_number}><span /></div>;
  });

  const cards = Object.keys(fields).map((val) => {

    let field = fields[val];
    const { slideKey } = findSlideKey(field.slide_number);
    const submittedPic = slideKey && submittedDocProp[slideKey].body.options.profile_image
    ? submittedDocProp[slideKey].body.options.profile_image
    : null;
    let wrapped = (img) => uploaderFn(field.slide_number, 'profile_image', img);
    let PlaybookUploader = (
      <Uploader
        savedPic={ submittedPic }
        updateState={ wrapped } >
        <i className="material-icons">cloud_upload</i>
      </Uploader>
    );

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
      return (
        <Card key={ field.slide_number }>
          <PlaybookBio
            { ...field }
            onSubmit={ submitAction }
            onChange={ onChange }
            submittedDoc={ submittedDocProp }
            findSlideKey={ findSlideKey }>
            { PlaybookUploader }
          </PlaybookBio>
        </Card>
      );

    case 'equipment':
      const opts = field.body.options.map((val, ind) => {

        const options = val.opts.map((opt, i) => {
          const optValue = JSON.stringify({opts: opt, optNames: val.optNames[i]});
          return <option value={optValue} key={opt}>{val.optNames[i]}</option>;
        });

        const { slide, slideKey } = findSlideKey(field.slide_number);

        const currentValue = JSON.stringify((slide && slide.body.options[ind].opts.length > 0)
        ? { opts: slide.body.options[ind].opts, optNames: slide.body.options[ind].optNames }
        : '');

        const selectTag = submittedDocProp
        ? <select value={ currentValue } onChange={e => onEquipChange(field.slide_number, val.id, (JSON.parse(e.target.value)))}>
            <option value=''></option>
            { options }
          </select>
        : <select>
            <option value=''></option>
            { options }
          </select>;

        return (
          <div key={val.id} className="equipment-choice">
            <span>{val.name + ':'}</span>
            { selectTag }
          </div>
        );
      });

      const status = submittedDocProp[field.slide_number].submitted
      ? <p>Submitted!</p>
      : null;

      return (
        <Card key={field.slide_number}>
          <h2>{field.heading}</h2>
          <div className = {field.body.textAlign || ''} dangerouslySetInnerHTML={{__html: field.body.desc}} />
          <div className="equipment-form">
            { opts }
          </div>
          <div className="slideFooter">
            { status }
            <Button classes="primary sm equipSub" onClick={ () => submitAction(field.slide_number) }>Submit</Button>
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

      const groupedDates = groupBy(field.body.agenda, (x) => moment(x.startTime).format('MMM Do'));

      const things = Object.keys(groupedDates).map((item, index) => {

        const items = groupedDates[item].map((val, i) => {
          return (
            <div className="agendaItem-details" key={i}>
              <div className="agendaItem-time">{moment(val.startTime).format('h:mm')} - {moment(val.finishTime).format('h:mm A')}</div>
              <div className="agendaItem-desc">{val.desc}</div>
            </div>
          );
        });

        return (
          <div className="agendaItem-container" key={index}>
            <div className="agendaItem-header">{moment(groupedDates[item][0].startTime).format('MMM Do, YYYY')}</div>
            { items }
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
              <div className="mapDesc">
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
              <div className="agendaItem">
                { things }
              </div>
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
    <div className="container container-playbook">
      { cards }
    </div>
  );
};

const clickHandler = (id, cb) => val => cb({key: id, val});

export default PlaybookCards;
