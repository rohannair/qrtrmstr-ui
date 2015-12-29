import React, { Component, PropTypes } from 'react';
import styles from './card.css';

const Card = props => {
  const { title, footer, children } = props;
  return (
    <article className="card">
      <Header>{title}</Header>
      <Body>{children}</Body>
      <Footer>{footer}</Footer>
    </article>
  );
};

const Header = (props) => {
  if (!props.children) return <span/>;
  return <header className="card-header">{ props.children }</header>;
};

const Footer = (props) => {
  if (!props.children) return <span/>;
  return <footer className="card-footer">{ props.children }</footer>;
};

const Body = (props) => {
  if (!props.children) return <span/>;
  return <section className="card-body">{ props.children }</section>;
};

export default Card;
