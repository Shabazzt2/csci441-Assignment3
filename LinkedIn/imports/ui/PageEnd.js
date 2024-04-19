import React from 'react';
import PropTypes from 'prop-types';

export default class PageEnd extends React.Component {
  render() {
    return (
      <div className='page-end'>
        <div className='page-end-wrapper'>{/* if we used wrapper, bg would be grey */}
          <p>{this.props.footerText}</p>
        </div>
      </div>
    );
  }
}

PageEnd.propTypes = {
  footerText: PropTypes.string.isRequired,
};
