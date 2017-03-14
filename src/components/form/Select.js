/**
 * Created by malamud on 30.11.16.
 */

import React from 'react';

const Select = (props) => {
  return (
    <div className={props.containerClassName}>
      <select
        id={props.id}
        onChange={props.onChange}
        style={{color: !props.value.length ? '#d9d7d7': 'black'}}
      >
          {(function() {
              const elements = [<option hidden="true" key="none">{props.labelText}</option> ];
              props.options.forEach((el, key) => {
                  elements.push(<option key={key} value={el.value}>{el.text}</option>);
              })
              return elements;
          })()}
      </select>
      <div style={props.errorStyle}>{props.error}</div>
    </div>
  );
};

Select.propTypes = {
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

export default Select;
