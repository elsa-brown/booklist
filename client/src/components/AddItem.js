import React from 'react';
import { gql, graphql } from 'react-apollo';
import { topicDetailsQuery } from './TopicDetails';
import { withRouter } from 'react-router';


const AddItem = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    console.log('evt.target.name ', evt.target.parentNode)
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
    <form className="itemInput" id="itemform">
      <input type="text" name="title" placeholder="Title" onKeyUp={handleKeyUp} />
      <input type="text" name="author" placeholder="Author" onKeyUp={handleKeyUp} />
      <input type="url" name="url" placeholder="link" onKeyUp={handleKeyUp} />
      <button>Add</button>
      <select form="itemform">
        <option value="have">Move To Have</option>
        <option value="read">Move To Read</option>
      </select>
      <button>Move</button>
    </form>
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
