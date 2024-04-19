import React from 'react';
import { discussionCommentsCollectionAccess } from './../api/discussion_comments.js';

export default class AddComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '', // Text of the comment
      isLoading: false // Indicates if the comment is being submitted
    };
    this.processComment = this.processComment.bind(this); // Binding the method in the constructor
    this.handleChange = this.handleChange.bind(this); // Binding handleChange to ensure 'this' context
  }

  processComment(event) {
    event.preventDefault();
    const { commentText } = this.state;
    if (!commentText.trim()) {
      alert('Comment cannot be empty!'); // Preventing empty or whitespace-only comments from being submitted
      return;
    }

    this.setState({ isLoading: true }); // Set loading true on submit
    discussionCommentsCollectionAccess.insert({
      comment_text: commentText,
      comment_up_votes: 0,
      comment_down_votes: 0,
      total_comment_votes: 0,
      post_id: this.props.post_id
    }, (error) => {
      if (error) {
        alert('Error adding comment:', error.reason); // Provide error feedback
        this.setState({ isLoading: false }); // Reset loading state on error
      } else {
        this.setState({ commentText: '', isLoading: false }); // Clear the input field and reset loading state
      }
    });
  }

  handleChange(event) {
    this.setState({ commentText: event.target.value });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className='single-block-item-style'>
        <form className='form' onSubmit={this.processComment}>
          <input
            className='form__input'
            type='text'
            name='formInputCommentAttribute'
            placeholder='Share your thoughts'
            value={this.state.commentText}
            onChange={this.handleChange}
            disabled={isLoading} // Disable input during loading
          />
          <button className='button' type='submit' disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Comment'} {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    );
  }
}

