import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Image,
} from 'react-bootstrap/esm';
import getCategoryById from '../../api/categoryApi';
import getUserById from '../../api/userApi';

export default function PostCard({ post }) {
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    getUserById(post.author_Id).then(setAuthor);
    getCategoryById(post.category_Id).then(setCategory);
  }, []);

  return (
    <Card>
      ({post.image_Url} ? <Image src={post.image_Url} />)
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{author}</CardText>
        <Badge>{category}</Badge>
      </CardHeader>
      <CardBody>
        <CardText>{post.content}</CardText>
      </CardBody>
      <CardFooter>
        ({post.approved} ? <Badge>Approved</Badge>)<CardText>{post.publication_Date}</CardText>
      </CardFooter>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    author_Id: PropTypes.number,
    category_Id: PropTypes.number,
    publication_Date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    content: PropTypes.string,
    image_Url: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,
};
