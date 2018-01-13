import React from 'react';
import ItemsList from './ItemsList';
import TopicPreview from './TopicPreview';
import NotFound from './NotFound';

import { gql, graphql } from 'react-apollo';

const TopicDetails = ({ data: { loading, error, topic }, match }) => {
  console.log('topic', topic)
  if (loading) {
    return <TopicPreview topicId={match.params.topicId} />
  } if (error) {
    return <p>{ error.message }</p>
  } if (topic === null) {
    return <NotFound />
  }

  return (
    <div>
      <div className="channelName">
        {topic.name}
      </div>
      <ItemsList items={topic.items}/>
    </div>);
}

export const topicDetailsQuery = gql`
  query TopicDetailsQuery($topicId: ID!) {
    topic(id: $topicId) {
      id
      name
      items {
        id
        name
      }
    }
  }
`;

const TopicDetailsWithQuery = graphql(topicDetailsQuery, {
  options: (props) => ({ variables: { topicId: props.match.params.topicId }
  })
});

export default(TopicDetailsWithQuery)(TopicDetails);
