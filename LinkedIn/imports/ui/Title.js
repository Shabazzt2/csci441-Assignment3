import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
  renderModerator() {
    if (this.props.moderator) {
      return <p className='title-bar__moderator'>moderator: {this.props.moderator}</p>
    } else {
      return <p className='title-bar__moderator'>moderator: unknown</p>
    }
  }
  
  render() {
    return (
      <div className='style'> {/* Changed class name to 'style' */}
        <div className='title-bar'>
          <h1>{this.props.title}</h1>
          {this.renderModerator()}
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  moderator: PropTypes.string,
};
