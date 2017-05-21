import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';
const Tag = (props) => {
  let text = props.text;
  return(
    <Label>
      <span onClick={() => props.filter(text)}>{text}</span>
      <Icon name={'delete'} onClick={() => props.remove(text)} />
    </Label>
  )
}

export default Tag;
