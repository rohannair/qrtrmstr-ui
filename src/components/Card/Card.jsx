import React, { Component, PropTypes } from 'react';
import styles from './card.css';
import classNames from 'classnames';

const Card = props => {
  const { title, footer, children, noPadding } = props;
  const cardClasses = classNames(
    'card',
    { 'card-noPadding': !!noPadding }
  );

  return (
    <article className={cardClasses}>
      <Header>{title}</Header>
      <Body>{children}</Body>
      <Footer>{footer}</Footer>
    </article>
  );
};

Card.PropTypes = {
  noPadding: PropTypes.boolean
};

Card.defaultProps = {
  noPadding: false
};

const Header = (props) => {
  if (!props.children) return <span/>;
  return <header className="card-header">{ props.children }</header>;
};

const Footer = (props) => {
  if (!props.children) return <span />;
  return <footer className="card-footer">{ props.children }</footer>;
};

const Body = (props) => {
  if (!props.children) return <span/>;
  return <section className="card-body">{ props.children }</section>;
};

export default Card;
