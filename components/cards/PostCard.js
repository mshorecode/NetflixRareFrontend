/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Image from 'next/image';
import { IoCreateOutline } from 'react-icons/io5';
import { GoTrash } from 'react-icons/go';
import { Button } from 'react-bootstrap';
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

  const editPost = () => {
    router.push(`/post/edit/${post.id}`);
  };

  useEffect(() => {
    getUserById(post.user_Id).then(setAuthor);
  }, [post]);

  const postDetails = () => {
    router.push(`/post/${post.id}`);
  };

  const formattedDate = moment(post.publication_Date).format('LL');

  return (
    <>
      <div key={post.id} className="mb-2 flex flex-col basis-1">
        <div className="w-full mx-auto my-8 p-3 border-b-[1px] border-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div>
              <div className="font-bold text-lg mb-2">{post.title}</div>
              <div className="text-sm mb-2 flex gap-1">
                <p className="text-slate-800 font-semibold">Author:</p>
                <p className="text-slate-800">{author.first_Name} {author.last_Name}</p>
              </div>
              <div className="text-sm mb-2 flex gap-1">
                <p className="text-slate-800 font-semibold">Publication Date:</p>
                <p className="text-slate-700">{formattedDate}</p>
              </div>
              <p>{post.content}</p>
            </div>
            <div className="flex justify-end">
              {post.image_Url && (
              <Image
                src={post.image_Url}
                alt={post.title}
                width={350}
                height={200}
                onClick={postDetails}
                className="object-cover"
              />
              )}
            </div>
          </div>
          <div className="flex justify-start mt-auto">
            <div>
              {user.id !== author.id ? (
                <Reactions postId={post.id} postReactions={post.reactions} className="text-2xl" />
              ) : ''}
            </div>
          </div>
          <div className="flex justify-start items-end mt-auto">
            {user.id === author.id ? (
              <div className="flex gap-2">
                <Button type="button" onClick={editPost} className="background hover:bg-transparent text-black-100 font-semibold border-none">
                  <IoCreateOutline className="text-2xl text-indigo-500" />
                </Button>
                <Button type="button" onClick={deleteAPost} className="background hover:bg-transparent text-black-100 font-semibold border-none">
                  <GoTrash className="text-xl mt-1 text-red-500" />
                </Button>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    </>
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
