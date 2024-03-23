import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Container, Image,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getPostDetails, deletePost } from '../../api/postApi';
import { getCategoryById } from '../../api/categoryApi';
import { getUserById } from '../../api/userApi';
import Reactions from '../../components/Reactions';
import { removeTagFromPost } from '../../api/tagsAPI';

export default function PostDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});

  const deleteAPost = () => {
    if (window.confirm('Do you want to delete this post?')) {
      deletePost(post.id).then(() => router.push('/feed'));
    }
  };

  const getCatAndUser = () => {
    getCategoryById(post?.category_Id).then(setCategory);
    getUserById(post?.user_Id).then(setAuthor);
  };

  const removeTag = (tagId) => {
    if (user.id === author.id) {
      const payload = {
        post_Id: post.id,
        tag_Id: tagId,
      };
      if (window.confirm('Do you want to remove this tag?')) {
        removeTagFromPost(payload).then(router.push(`/post/${post.id}`));
      }
    }
  };

  useEffect(() => {
    getPostDetails(id).then(setPost).then(getCatAndUser());
  }, [id]);

  return (
    <Container className="p-4">
      <div className="flex flex-row justify-between items-center mb-4">

        <div className="flex">
          {user.id === author?.id
            ? (
              <ButtonGroup
                className="justify-self-end"
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
        <h1>{post?.title}</h1>
        <p>{category?.label}</p>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="justify-center">
          <Image
            src={post?.image_Url}
          />
        </div>
        <div className="place-self-end">
          {post.tags?.map((t) => (
            <Button
              onClick={() => removeTag(t.id)}
              id={`tag-${t.id}`}
              key={t.id}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-4">

        <h5>By {author?.first_Name} {author?.last_Name}</h5>
        <Link href={`/post/comments/${post.id}`} passHref>
          <Button>
            View Comments

          </Button>
        </Link>
        <Reactions />
      </div>
      <div>
        {post.content}
      </div>
    </Container>
  );
}
