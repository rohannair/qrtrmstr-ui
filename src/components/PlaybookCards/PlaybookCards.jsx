import React from 'react';
import classnames from 'classnames';
import styles from './playbookCard.css';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';
import PlaybookFormCard from '../../components/PlaybookFormCard';
import PlaybookTextCard from '../../components/PlaybookTextCard';

// Mock
const userInfo = {
  firstName: 'Rachel',
  lastName: 'Galaxy'
};

const PlaybookCards = (props) => {
  const { fields, onClick, onSubmit, selected } = props;
  const cardCount = Object.keys(fields).map(val => {
    let field = fields[val];
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
          <h2>Fill out your profile</h2>
          <div className="bio">
            <div className="bio-info">
              <div className="upload-img">
                Upload a profile picture
                <i className="material-icons">cloud_upload</i>
              </div>
            </div>
            <div className="bio-form">
              <h3>{ userInfo.firstName + ' ' + userInfo.lastName}</h3>
              <p>User Experience Designer - <a href="#">rachel.galaxy@scotiabank.com</a></p>
              <textarea placeholder="Tell the team a little bit about yourself..."/>

              <div className="social-media">
                <li className="fb">Link to your Facebook</li>
                <li className="tw">Link to your Twitter</li>
                <li className="li">Link to your LinkedIn</li>
              </div>
            </div>
          </div>

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
      const options = field.body.options.map((val, i) => {
        if (i === 1) {
          return <a className="active" href="#" key={val.id}><i className="material-icons">ondemand_video</i> {val.name}</a>;
        }
        return <a href="#" key={val.id}><i className="material-icons">ondemand_video</i> {val.name}</a>;
      });
      return (
        <Card key={field.slide_number} footer={<div/>}>
          <h2>{field.heading}</h2>
          <p className = {field.body.textAlign || ''}>{field.body.desc}</p>

          <div className="playlist">
            <div className="playlist-menu">
              <div className="playlist-header">
                <i className="material-icons">playlist_play</i>UX Designer Playlist
              </div>
              { options }
            </div>

            <div className="playlist-viewer">
              <iframe src={`http://www.youtube.com/embed/${field.body.options[1].id}`} />
            </div>
          </div>
          <div className="playlist-footer">
            {field.body.footer}
          </div>
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
      <Card footer={<div/>}>
        <div className="progressbar">{ cardCount }</div>
      </Card>
      { cards }
    </div>
  );
};

const clickHandler = (id, cb) => val => cb({key: id, val});

export default PlaybookCards;