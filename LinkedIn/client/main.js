import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';




Meteor.startup(() => {
  Tracker.autorun(() => { 

    let title = 'Welcome to LinkedIn';

    let jsx = (
      <div>
        <h1>{title}</h1>
      </div>
    );
    ReactDom.render(jsx, document.getElementById('react-target'));
  });

});
