// import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Components(props) {
  const { children, className } = props;

  return (
    <>
      <button className={className}>{children}</button>
    </>
  )
}

Components.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  onClick: null,
  tile: false,
  to: '',
  type: 'button',
  variant: 'orange',
};

Components.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tile: PropTypes.bool,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['bordered', 'red', 'orange', 'text', 'gray']),
};
