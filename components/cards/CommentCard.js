import {
  Card, CardBody, CardSubtitle, CardText,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getUserById } from '../../api/userApi';

export default function CommentCard({ comment }) {
  const [author, setAuthor] = useState({});

  const formattedDate = moment(comment.created_On).format('LL');

  useEffect(() => {
    getUserById(comment.author_Id).then(setAuthor);
  });

  return (
    <Card>
      <CardBody>
        <CardText>
          {comment.content}
        </CardText>
        <CardSubtitle>- {author.first_Name} {author.last_Name}</CardSubtitle>
        <CardSubtitle>{formattedDate}</CardSubtitle>
      </CardBody>
    </Card>
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
