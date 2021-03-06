import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const TopicPreview = ({ data: { loading, error, topic } }) => {
  return (
  	<div>
	    <div className="channelName">
	      {topic ? topic.name : 'Loading...'}
	    </div>

	    <div>Loading Items...</div>
	  </div>
  );
};

export const topicQuery = gql`
	query TopicQuery($topicId : ID!) {
		topic(id: $topicId) {
			id
			name
		}
	}
`;


export default graphql(topicQuery, {
	options: (props) => ({
		variables: { topicId: props.topicId }
	})
})(TopicPreview);
