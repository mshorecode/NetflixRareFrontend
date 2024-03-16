/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Image,
} from 'react-bootstrap';
import getCategoryById from '../../api/categoryApi';
import getUserById from '../../api/userApi';

function PostCard({ post }) {
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    getUserById(post?.user_Id).then(setAuthor);
    getCategoryById(post?.category_Id).then(setCategory);
  }, []);

  return (
    <Card>
      {post.image_Url ? (<Image src={post.image_Url} />) : ''}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{author.first_name}{author.last_name}</CardText>
        <Badge>{category.title}</Badge>
      </CardHeader>
      <CardBody>
        <CardText>{post.content}</CardText>
        {post.approved ? (<Badge>Approved</Badge>) : ''}
        <CardText>{post.publication_Date}</CardText>
      </CardBody>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user_Id: PropTypes.number,
    category_Id: PropTypes.number,
    publication_Date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    content: PropTypes.string,
    image_Url: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,
};

export default PostCard;
