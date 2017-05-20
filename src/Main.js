import React, { Component } from 'react';

var ExampleComponent = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount: function() {
  var ref = firebase.database().ref("users");
  this.bindAsArray(ref, "users");
  }
});
