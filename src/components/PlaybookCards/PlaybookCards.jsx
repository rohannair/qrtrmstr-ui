import React from 'react';
import classnames from 'classnames';
import styles from './playbookCard.css';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';
import PlaybookFormCard from '../../components/PlaybookFormCard';
import PlaybookTextCard from '../../components/PlaybookTextCard';
import PlaybookKnowledgeCentre from '../../components/PlaybookKnowledgeCentre';
import PlaybookBio from '../../components/PlaybookBio';

// Mock
const userInfo = {
  firstName: 'Rachel',
  lastName: 'Galaxy'
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
      return (
        <Card key={ field.slide_number } footer={<div/>}>
          <PlaybookBio { ...field } userInfo={ userInfo } />
        </Card>
      );

    case 'equipment':
      const opts = field.body.options.map(val => {

        const options = val.opts.map((opt, i) => {
          return <option value={opt} key={opt}>{val.optNames[i]}</option>;
        });

        return (
          <div key={val.id} className="equipment-choice">
            <span>{val.name + ':'}</span>
            <select>
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
            <span className="agendaItem-time">{val.time}</span>
            <span className="agendaItem-desc">{val.desc}</span>
          </div>
        );
      });

      const map_html = field.body.map
        .replace('<span class="fa fa-building"></span>', '<i class="material-icons">location_on</i>')
        .replace('<span class="fa fa-user"></span>', '<i class="material-icons">person</i>')
        .replace('<span class="fa fa-envelope"></span>', '<i class="material-icons">mail</i>&nbsp;')
        .replace('<a href="#">onboarding@scotiabank.com</a>', 'Questions - <a href="#">onboarding@scotiabank.com</a>');

      return (
        <Card key={field.slide_number} footer={<div/>}>
          <h2>{field.heading}</h2>
          <div className="day1-body">
            <div className="day1-map"
              dangerouslySetInnerHTML={{__html: map_html}}
            />
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
