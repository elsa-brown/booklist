import React from 'react';
import { Link } from 'react-router-dom'

import { gql, graphql } from 'react-apollo';

import AddTopic from './AddTopic';

const TopicsList = ({ data: { loading, error, topics }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddTopic />
      { topics.map(topic =>
        (<div key={topic.id} className={'channel' + (topic.id < 0 ? 'optimistic' : '')}>
          <Link to={topic.id < 0 ? `/` : `topics/${topic.id}`}>
            {topic.name}
          </Link>
        </div>)
      )}
    </div>
  );
};

export const topicsListQuery = gql`
  query TopicsListQuery {
    topics {
      id
      name
    }
  }
`;

export default graphql(topicsListQuery, {
  options: { pollInterval: 5000 },
})(TopicsList);
