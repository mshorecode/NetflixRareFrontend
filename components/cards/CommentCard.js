import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getUserById } from '../../api/userApi';

export default function CommentCard({ comment }) {
  const [author, setAuthor] = useState({});

  const formattedDate = moment(comment.created_On).format('LL');

  useEffect(() => {
    getUserById(comment.author_Id).then(setAuthor);
    console.warn(author);
  }, []);

  return (
    <div className="comment bg-inherit mt-40 p-3 border-t-slate-500 border-b-slate-500 rounded-none">
      <p>
        <h1 className="font-semibold text-lg">{author.first_Name} {author.last_Name}</h1>
        <p className="my-2 text-md">
          {comment.content}
        </p>
        <h1 className="text-sm text-slate-800 font-semibold">
          Created On:
        </h1>
        <h1 className="font-normal text-gray-700">{formattedDate}</h1>
      </p>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    author_Id: PropTypes.number,
    post_Id: PropTypes.number,
    created_On: PropTypes.instanceOf(Date),
    content: PropTypes.string,
  }).isRequired,
};
