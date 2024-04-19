import { Mongo } from 'meteor/mongo';
import numeral from 'numeral';

// Exporting a MongoDB collection for discussion posts
export const DiscussionPostsAccess = new Mongo.Collection('discussion_posts');

// Function to calculate ranks and formatted positions for discussion posts
export const calculateRankAndPosition = (discussionPosts) => {
    let rank = 1;
    const today = new Date(); // Current date for calculating post age

    // Returning an array of posts with added rank and formatted ordinal position
    return discussionPosts.map((post, index) => {
      if (index !== 0) {
        const prevPost = discussionPosts[index - 1];
        const voteDiff = prevPost.votes - post.votes;
        const timeDiff = (today - post.createdAt) / (1000 * 60 * 60 * 24); // Time diff in days

        // Adjust rank based on votes and slightly favor newer posts
        if (voteDiff > 0 || (voteDiff === 0 && timeDiff < 30)) { // New posts less than 30 days old with same votes rank higher
          rank++;
        }
      }

      // Return the post with additional properties
      return {
        ...post,
        rank,
        position: numeral(rank).format('0o'), // Formatting rank as ordinal
      };
    });
};


