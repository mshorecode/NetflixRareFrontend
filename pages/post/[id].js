/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Container, Image,
} from 'react-bootstrap';
import Link from 'next/link';
import { IoCreateOutline } from 'react-icons/io5';
import { GoTrash } from 'react-icons/go';
import moment from 'moment';
import { useAuth } from '../../utils/context/authContext';
import { getPostDetails, deletePost } from '../../api/postApi';
import { getCategoryById } from '../../api/categoryApi';
import { getUserById } from '../../api/userApi';
import Reactions from '../../components/Reactions';
import TagBadge from '../../components/TagBadge';

export default function PostDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});

  const deleteThePost = () => {
    if (window.confirm('Do you want to delete this post?')) {
      deletePost(post.id).then(() => router.push('/feed'));
    }
  };

  const getCatAndUser = () => {
    getCategoryById(post?.category_Id).then(setCategory);
    getUserById(post?.user_Id).then(setAuthor);
  };

  const editPost = () => {
    router.push(`/post/edit/${post.id}`);
  };

  useEffect(() => {
    getPostDetails(id).then(setPost).then(getCatAndUser());
  }, [id]);

  return (
    <Container className="p-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h1 className="font-bold text-xl">{post?.title}</h1>
          <div className="text-sm mt-2 flex gap-1">
            <p className="text-slate-800 font-semibold">Publication Date:</p>
            <p className="text-slate-700">{moment(post?.publication_Date).format('LL')}</p>
          </div>
        </div>
        <div className="flex-col">
          {post.tags?.map((tag) => (
            <TagBadge id={tag.id} />
          ))}
          <p className="text-sm text-slate-700 mt-2 font-semibold">{category?.label}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={post.image_Url}
          alt={post.title}
          layout="responsive"
          className="object-cover my-4"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h5>{author?.first_name} {author?.last_name}</h5>
        </div>
        <Reactions />
      </div>
      <div>
        <p>{post?.content}</p>
      </div>
      <div className="flex justify-between mt-5">
        {user?.id === author?.id && (
        <div className="flex justify-start">
          <Button type="button" onClick={editPost} className="background hover:bg-transparent text-black-100 font-semibold border-none">
            <IoCreateOutline className="text-2xl text-indigo-500" />
          </Button>
          <Button type="button" onClick={deleteThePost} className="background hover:bg-transparent text-black-100 font-semibold border-none">
            <GoTrash className="text-xl mt-1 text-red-500" />
          </Button>
        </div>
        )}
        <div className="flex justify-end">
          <Link href={`/post/comments/${post.id}`} passHref>
            <Button className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-1 py-1">
              View Comments
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
