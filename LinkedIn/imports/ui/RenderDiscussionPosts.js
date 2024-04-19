import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionPostsCollectionAccess } from './../api/discussion_posts.js';
import { discussionCommentsCollectionAccess } from './../api/discussion_comments.js';
import AddComments from './AddComments.js';
import ReplyCommentList from './ReplyCommentList.js';

export default class RenderDiscussionPost extends React.Component {
  render() {
    const { post, commentArray } = this.props;
    const singleItemClassName = `single-block-item-style single-block-item-style--position-${post.rank}`;

    let possibleLink = post.topic;
    if (possibleLink.includes('http')) {
      possibleLink = <a href={possibleLink}>{possibleLink}</a>;
    }

    const handleUpVote = () => {
      DiscussionPostsCollectionAccess.update({ _id: post._id }, { $inc: { up_votes: 1 } });
    };

    const handleDownVote = () => {
      DiscussionPostsCollectionAccess.update({ _id: post._id }, { $inc: { down_votes: 1 } });
    };

    const handleDelete = () => {
      DiscussionPostsCollectionAccess.remove({ _id: post._id });
      commentArray.forEach((comment) => {
        discussionCommentsCollectionAccess.remove({ _id: comment._id });
      });
    };

    return (
      <>
        <div key={post._id} className={singleItemClassName}>
          <div className='post'>
            <div>
              <p className='post__stats'>
                {post.up_votes} up vote[s] <br />{post.down_votes} down vote[s]
              </p>
              <h3 className='post__topic'>{possibleLink}</h3>
            </div>
            <div className='post__actions'>
              <button className='button button--round' onClick={handleUpVote}>+1</button>
              <button className='button button--round' onClick={handleDownVote}>-1</button>
              <button className='button button--round' onClick={handleDelete}>X</button><br /><br /><br />
            </div>
          </div>
          <AddComments postId={post._id} />
          <ReplyCommentList passedCommentProps={commentArray} />
        </div>
      </>
    );
  }
}

RenderDiscussionPost.propTypes = {
  post: PropTypes.object.isRequired,
  commentArray: PropTypes.array.isRequired,
};

