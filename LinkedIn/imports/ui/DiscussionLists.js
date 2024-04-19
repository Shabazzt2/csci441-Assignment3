import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import RenderDiscussionPosts from './RenderDiscussionPosts.js';
import { discussionCommentsCollectionAccess, Calculate_rank } from './../api/discussion_comments.js';

const DiscussionList = ({ passed_posts }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (passed_posts.length > 0) {
      setLoading(true);
      try {
        const fetchedComments = passed_posts.map(post => {
          const fetched = discussionCommentsCollectionAccess.find({ post_id: post._id }, { sort: { total_comment_votes: -1 } }).fetch();
          return Calculate_rank(fetched);
        });
        setComments(fetchedComments);
      } catch (e) {
        setError('Failed to fetch comments.');
      } finally {
        setLoading(false);
      }
    }
  }, [passed_posts]);

  const renderAllPosts = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (passed_posts.length === 0) {
      return <div className='single-block-item-style'><p className='single-block-item-style__message'>Add a new topic to get started</p></div>;
    }

    return passed_posts.map((post, index) => (
      <RenderDiscussionPosts key={post._id} postPropObj={post} commentPropArray={comments[index]} />
    ));
  };

  return (
    <FlipMove delay={500} leaveAnimation="accordionVertical" maintainContainerHeight={true}>
      {renderAllPosts()}
    </FlipMove>
  );
}

DiscussionList.propTypes = {
  passed_posts: PropTypes.array.isRequired,
};

export default DiscussionList;

