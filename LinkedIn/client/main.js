import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'; // Ensure Tracker is imported if used
import { DiscussionPostsCollectionAccess } from './../imports/api/discussion_posts.js';
import App from './../imports/ui/App.js';

Meteor.startup(() => {
  Tracker.autorun(() => {
    // Fetch posts ordered by date added in descending order
    const allPostsInDB = DiscussionPostsCollectionAccess.find({}, { sort: { date_added: -1 } }).fetch();
    const title = 'Welcome to LinkedIn'; // Customized title for your application

    ReactDOM.render(
      <App
        title={title}
        allPosts={allPostsInDB}
        moderator={'Admin'}
        footer={'\u00A9 Welcome to LinkedIn'}
      />,
      document.getElementById('root') // Adjusted to 'root' to match typical React conventions
    );
    
  });
});
