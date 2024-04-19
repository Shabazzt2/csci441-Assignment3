import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Title from './Title.js';
import AddDiscussions from './AddDiscussions.js';
import DiscussionList from './DiscussionList.js';
import PageEnd from './PageEnd.js';

const App = ({ title, moderator, allPosts, footer }) => {
  // Example state if needed, like a toggle state or something relevant
  const [isActive, setIsActive] = useState(true);

  // Example useEffect, if you need to perform side effects
  useEffect(() => {
    // Perform some side effect when component mounts or updates
    console.log("Component did mount or update");
  }, [isActive]); // dependency array controls re-execution of effect

  return (
    <>
      <Title title={title} moderator={moderator} />

      <div className='style'>
        <AddDiscussions />
        <DiscussionList passed_posts={allPosts} />
      </div>
      <PageEnd footerText={footer} />
    </>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  allPosts: PropTypes.array.isRequired,
  moderator: PropTypes.string,
  footer: PropTypes.string
};

export default App;
