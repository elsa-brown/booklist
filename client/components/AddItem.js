import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { topicDetailsQuery } from './TopicDetails';
import { withRouter } from 'react-router';


const AddItem = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    console.log('evt.target.value ', evt.target.value)
    if (evt.keyCode === 13) {
      mutate({ 
        variables: {
          item: {
            topicId: match.params.topicId,
            name: evt.target.value
          }
        },
        optimisticResponse: {
          addItem: {
            name: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Item',
          }
        },
        update: (store, { data: { addItem } }) => {
          const data = store.readQuery({
            query: topicDetailsQuery,
            variables: {
              topicId: match.params.topicId
            }
          });
          data.topic.items.push(addItem);
          store.writeQuery({
            query: topicDetailsQuery,
            variables: {
              topicId: match.params.topicId
            },
            data
          });
        }
      });
      evt.target.value = '';
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New item"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const addItemMutation = gql`
  mutation AddItem($item: ItemInput!) {
    addItem(item: $item) {
      name
      id
    }
  }
`;

const AddItemWithMutation = graphql(addItemMutation)(withRouter(AddItem))

export default AddItemWithMutation;
