import React from 'react';
import classNames from 'classnames';

import styles from './playbookFormCard.css';

import Card from '../../components/Card';
import PlaybookCardFooter from '../../components/PlaybookCardFooter';

const PlaybookFormCard = ({ heading, body, onClick, selected }) => {
  // const { type, options } = contents;
  let type = 'imageSelector';
  return (
    <Card footer={<PlaybookCardFooter />}>
      <h2>{heading}</h2>
      <div className={type}>
        { FormTypes.imageSelector(body, onClick, selected) }
      </div>
    </Card>
  );
};

const FormTypes = {
  imageSelector: (opts, onClick = () => {}, selected = null) => {
    return opts.map(({id, img, title, desc}) => {

      const classes = classNames(
        'imageSelector-option',
        id === selected ? 'selected' : ''
      );

      return (
        <a
          key={'opt' + id}
          className={ classes }
          onClick={onClick.bind(this, id)}
        >
          {
            img
            ? <img src={img} />
            : <div className="img-placeholder" />
          }
          <h3>{ title }</h3>
          <p>{ desc }</p>
        </a>
      );
    });
  }
};

export default PlaybookFormCard;
