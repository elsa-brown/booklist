// import React from 'react';
// import { Link } from 'react-router-dom'

// import { gql, graphql } from 'react-apollo';

// import AddItem from './AddItem';

// const ItemsList = ({ data: { loading, error, items }}) => {
//   if (loading) {
//     return <p>Loading ...</p>;
//   }
//   if (error) {
//     return <p>{error.message}</p>;
//   }

//   return (
//     <div>
//     <p>Show Book List | Show Topic List</p>
//     <div className="channelsList">
//       <AddTopic />
//       { topics.map(topic =>
//         (<div key={topic.id} className={'channel' + (topic.id < 0 ? 'optimistic' : '')}>
//           <Link to={topic.id < 0 ? `/` : `topics/${topic.id}`}>
//             {topic.name}
//           </Link>
//         </div>)
//       )}
//     </div>
//     </div>
//   );
// };

// export const topicsListQuery = gql`
//   query TopicsListQuery {
//     topics {
//       id
//       name
//     }
//   }
// `;

// export default graphql(topicsListQuery, {
//   options: { pollInterval: 10 },
// })(TopicsList);
