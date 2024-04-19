import { Mongo } from 'meteor/mongo';

// Initializes the MongoDB collection for storing discussion comments. This collection
// needs to be imported in the server/main.js to set up and enable database interactions.
export const discussionCommentsCollectionAccess= new Mongo.Collection('discussion_comments');

// This function assigns ranks to discussion comments based on their vote counts. It also handles
// ties by assigning the same rank to comments with the same number of votes.
export const assignCommentRanks = (comments) => {
    if (!comments.length) return []; // Handle empty comment list gracefully

    // Sort comments by votes in descending order to simplify rank assignment
    comments.sort((a, b) => b.votes - a.votes);

    let currentRank = 1;
    let previousVotes = comments[0].votes; // Start with the highest vote count

    // Map through the sorted comments to assign ranks
    return comments.map((comment, index) => {
      // Check if the current comment has fewer votes than the one before it
      if (index !== 0 && previousVotes > comment.votes) {
        currentRank = index + 1; // Update rank to reflect the number of comments before it with more votes
      }
      previousVotes = comment.votes; // Update previousVotes for the next iteration

      // Return the comment with the updated rank
      return {
        ...comment, // Include all existing properties of the comment
        rank: currentRank, // Assign the updated rank
      };
    });
};
