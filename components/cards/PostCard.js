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
  Button,
  ButtonGroup,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useRouter } from 'next/router';
import { getCategoryById } from '../../api/categoryApi';
import { getUserById } from '../../api/userApi';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../api/postApi';
import Reactions from '../Reactions';
import TagBadge from '../TagBadge';

function PostCard({ post, onUpdate }) {
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  const isDetail = pathname.includes('/post');

  const getCatAndAuthor = () => {
    getUserById(post?.user_Id).then(setAuthor);
    getCategoryById(post?.category_Id).then(setCategory);
  };

  const deleteAPost = () => {
    if (window.confirm('Do you want to delete this post?')) {
      deletePost(post.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getCatAndAuthor();
  }, [post]);

  const formattedDate = moment(post.publication_Date).format('LL');

  return (
    <Card
      className="mb-2"
    >
      {post.image_Url ? (<Image src={post.image_Url} />) : ''}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{formattedDate}</CardText>
        <CardText>{author?.first_Name} {author?.last_Name}</CardText>
      </CardHeader>
      <CardBody>
        <CardText>{post.content}</CardText>
        {isDetail ? (
          <>
            <Badge>{category?.label}</Badge>
            {post.approved ? (<Badge>Approved</Badge>) : ''}
            {post.tags?.map((t) => (
              <TagBadge id={t.id} />
            ))}
            <Reactions />
          </>
        ) : ''}
        <div className="flex">
          {user.id === author?.id
            ? (
              <ButtonGroup
                className="justify-self-end"
              >
                <Button className="rounded-none" onClick={() => router.push(`/post/edit/${post.id}`)}>Edit</Button>
                <Button className="rounded-none" onClick={deleteAPost}>Delete</Button>
              </ButtonGroup>
            ) : ''}
        </div>
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
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
