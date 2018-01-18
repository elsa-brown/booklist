import React from 'react';
import { Link } from 'react-router-dom'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import AddTopic from './AddTopic';

const TopicsList = ({ data: { loading, error, allTopics }}) => {
  console.log('allTopics ', allTopics)
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
    <p>Show Book List | Show Topic List</p>
    <div className="channelsList">
      <AddTopic />
      { allTopics.map(topic =>
        (<div key={topic.id} className={'channel' + (topic.id < 0 ? 'optimistic' : '')}>
          <Link to={topic.id < 0 ? `/` : `topics/${topic.id}`}>
            {topic.name}
          </Link>
        </div>)
      )} 
    </div>
    </div>
  );
};

export const topicsListQuery = gql`
  query TopicsListQuery {
    allTopics {
      id
      name
    }
  }
`;

export default graphql(topicsListQuery)(TopicsList);
