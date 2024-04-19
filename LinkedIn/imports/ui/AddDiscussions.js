import React from 'react';
import { DiscussionPostsCollectionAccess } from './../api/discussion_posts.js'; // Correct import statement

export default class AddDiscussions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discussionTitle: '',
      isLoading: false
    };
    this.processFormData = this.processFormData.bind(this); // Bind in constructor
  }

  processFormData(event) {
    event.preventDefault();
    const { discussionTitle } = this.state;

    if (discussionTitle) {
      this.setState({ isLoading: true });
      DiscussionPostsCollectionAccess.insert({
        topic: discussionTitle,
        up_votes: 0,
        down_votes: 0,
        date_added: new Date(),
      }, (error) => {
        if (error) {
          alert('Error adding discussion:', error.reason);
          this.setState({ isLoading: false });
        } else {
          this.setState({ discussionTitle: '', isLoading: false });
          alert('Discussion added successfully!');
        }
      });
    } else {
      alert('Discussion topic cannot be empty!');
    }
  }

  handleChange = (event) => {
    this.setState({ discussionTitle: event.target.value });
  }

  render() {
    const { discussionTitle, isLoading } = this.state;
    return (
      <div className='single-block-item-style'>
        <form className='form' onSubmit={this.processFormData}>
          <input
            className='form__input'
            type='text'
            name='formInputNameAttribute'
            placeholder='Discussion Topic'
            value={discussionTitle}
            onChange={this.handleChange}
            disabled={isLoading}
          />
          <button className='button' disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Discussion'}
          </button>
        </form>
      </div>
    );
  }
}

