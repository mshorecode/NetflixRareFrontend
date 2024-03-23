/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Image,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useRouter } from 'next/router';
import { getUserById } from '../../api/userApi';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../api/postApi';
import Reactions from '../Reactions';

function PostCard({ post, onUpdate }) {
  const [author, setAuthor] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const deleteAPost = () => {
    if (window.confirm('Do you want to delete this post?')) {
      deletePost(post.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getUserById(post.user_Id).then(setAuthor);
  }, [post]);

  const formattedDate = moment(post.publication_Date).format('LL');

  return (

    <Card
      className="mb-2 flex flex-col basis-1"
    >
      <CardBody>
        <a
          href={`/post/${post.id}`}
        >
          <div className="flex flex-row justify-between">
            <CardTitle>{post.title}</CardTitle>
            <CardText>{formattedDate}</CardText>
          </div>
          <div className="flex justify-center">
            {post.image_Url ? (<Image src={post.image_Url} />) : ''}
          </div>
        </a>

        <div className="flex flex-row justify-between items-center">
          <CardText>{author?.first_Name} {author?.last_Name}</CardText>
          <div className="flex flex-row justify-end items-center">
            {user.id === author?.id
              ? (
                <ButtonGroup
                  className="justify-self-end ml-4"
                >
                  <Button className="rounded-none mr-4" onClick={() => router.push(`/post/edit/${post.id}`)}>
                    <span className="material-symbols-outlined">edit</span>
                  </Button>
                  <Button className="rounded-none" onClick={deleteAPost}>
                    <span className="material-symbols-outlined">delete</span>
                  </Button>
                </ButtonGroup>
              ) : ''}
          </div>
        </div>
        <Reactions postId={post.id} postReactions={post.reactions} />
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
    reactions: PropTypes.arrayOf(),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
