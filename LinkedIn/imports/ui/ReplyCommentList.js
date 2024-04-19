import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import RenderComments from './RenderComments.js';

const ReplyCommentList = ({ passedCommentProps }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (passedCommentProps.length > 0) {
      setIsLoading(false); // Assuming data is fetched elsewhere and setting loading accordingly
    }
  }, [passedCommentProps]);

  const renderAllComments = () => {
    if (isLoading) {
      return <p>Loading comments...</p>; // Display loading feedback
    }

    return passedCommentProps.map((comment) => (
      <RenderComments key={comment._id} commentPropObj={comment} />
    ));
  };

  return (
    <FlipMove delay={500} leaveAnimation="accordionVertical" maintainContainerHeight={true}>
      {renderAllComments()}
    </FlipMove>
  );
};

ReplyCommentList.propTypes = {
  passedCommentProps: PropTypes.array.isRequired,
};

export default ReplyCommentList;

