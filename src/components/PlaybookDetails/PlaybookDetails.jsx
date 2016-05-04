import React, { Component, PropTypes } from 'react';
import { camelCase } from 'lodash';

import Card from '../../components/Card';
import Button from '../../components/Button';
import moment from 'moment';

import styles from './playbookDetails.css';

const PlaybookDetails = ({playbookID, created_at, updated_at, name}) => {

  const details = [
   { name: 'Title', content: name },
   { name: 'ID', content: playbookID },
   { name: 'Created', content: moment(created_at).fromNow() },
   { name: 'Updated', content: moment(updated_at).fromNow() },
  ];

  const detailsInstances = details.map(({name, content}) => {
    return (
      <div className="details-instance" key={ camelCase(name) }>
        <h4>{name}</h4>
        <span>{content}</span>
      </div>
    );
  });

  return (
    <Card noPadding={true}>
      <div className="editPlaybook-details">
          <h2>Playbook Details</h2>
          <div className="details-container">
            { detailsInstances }
        </div>
      </div>
    </Card>
  );
};

export default PlaybookDetails;
