import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { topicsListQuery } from './TopicsListWithData';

const AddTopic = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({ 
        variables: { name: evt.target.value },
        optimisticResponse: {
          addTopic: {
            name: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Topic',
          },
        },
        update: (store, { data: { addTopic } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: topicsListQuery });
            // Add our category from the mutation to the end of data object.
            data.topics.push(addTopic);
            // Write the data back to the cache.
            store.writeQuery({ query: topicsListQuery, data });
          },
      });
      evt.target.value = '';
    }
  };

  return (
    <input
      type="text"
      placeholder="Add category"
      onKeyUp={handleKeyUp}
    />
  );
};

const addTopicMutation = gql`
  mutation AddTopic($name: String!) {
    addTopic(name: $name) {
      id
      name
    }
  }
`;


const AddTopicWithMutation = graphql(
  addTopicMutation)(AddTopic);

export default AddTopicWithMutation;
