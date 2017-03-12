/**
 * Created by malamud on 30.11.16.
 */

import React from 'react';

const Input = (props) => {
  return (
    <div className={props.containerClassName}>
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      <label htmlFor={props.id}>{props.labelText}</label>
      <div style={props.errorStyle}>{props.error}</div>
    </div>
  );
};

Input.propTypes = {
  containerClassName: React.PropTypes.string,
  errorStyle: React.PropTypes.string,
  labelText: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  id: React.PropTypes.string,
  error: React.PropTypes.string,
};

export default Input;
