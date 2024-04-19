import React from 'react';
import { discussionCommentsCollectionAccess } from './../api/discussion_comments.js';
import PropTypes from 'prop-types';

export default class RenderComments extends React.Component {
  render() {
    let singleItemClassName =
      `single-block-item-style
      single-block-item-style--position-${this.props.commentPropObj.rank}`;

    let possibleLink = this.props.commentPropObj.comment_text;
    if (this.props.commentPropObj.comment_text.includes('http')) {
      possibleLink = <a href={this.props.commentPropObj.comment_text}>{this.props.commentPropObj.comment_text}</a>;
    }

    return (
      <>
        <div key={this.props.commentPropObj._id} className={singleItemClassName}>
          <div className='post'>
            <div>
              <h3 className='post__topic'>{possibleLink}</h3>
              <p className='post__stats'>{this.props.commentPropObj.total_comment_votes} total vote[s] <br />
                {this.props.commentPropObj.comment_up_votes} up <br /> {this.props.commentPropObj.comment_down_votes} down
              </p>
            </div>
            <div className='post__actions'>
              <button className='button button--round' onClick={() => {
                discussionCommentsCollectionAccess.update({ _id: this.props.commentPropObj._id },
                  { $inc: { comment_up_votes: 1, total_comment_votes: 1 } })
              }}>+1</button>
              <button className='button button--round' onClick={() => {
                discussionCommentsCollectionAccess.update({ _id: this.props.commentPropObj._id },
                  { $inc: { comment_down_votes: 1, total_comment_votes: 1 } })
              }}>-1</button>
              <button className='button button--round' onClick={() => {
                discussionCommentsCollectionAccess.remove({ _id: this.props.commentPropObj._id })
              }}>X</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

RenderComments.propTypes = {
  commentPropObj: PropTypes.object.isRequired,
};
