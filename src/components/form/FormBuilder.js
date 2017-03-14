/**
 * Created by malamud on 30.11.16.
 */

import React from 'react';
import Input from './Input.js';
import Password from './Password.js';
import Select from './Select.js';

class FormBuilder extends React.Component {
  constructor() {
    super();
    this.renderInput = this.renderInput.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderElements()}
      </div>
    );
  }

  renderElements() {
    const elements = this.props.elements.map((el, key) => {
      switch (el.type) {
        case 'input':
          return this.renderInput(el, key);
        case 'password':
          return this.renderPassword(el, key);
        case 'select':
          return this.renderSelect(el, key);
        default:
          return null;
      }
    });
    return elements;
  }

  renderInput(el, key) {
    return (
      <Input
        key={key}
        {...el}
      />
    );
  }

  renderPassword(el, key) {
    return (
      <Password
        key={key}
        {...el}
      />
    );
  }
  
  renderSelect(el, key) {
    return (
      <Select
        key={key}
        {...el}
      />
    );
  }
}

FormBuilder.propTypes = {
  className: React.PropTypes.string,
  elements: React.PropTypes.array,
};

export default FormBuilder;
