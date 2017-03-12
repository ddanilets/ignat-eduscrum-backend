/**
 * Created by malamud on 01.12.16.
 */

import React from 'react';

const Button = (props) => {
  return (
    <div style={props.style}>
      <button style={{cursor: props.disabled ? 'not-allowed' : 'pointer' }}
        onClick={props.onClick}
        disabled={props.disabled}
        className={props.className}> { props.buttonText } </button>
    </div>
  );
};

Button.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  buttonText: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Button;
