import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { useAuth } from '../utils/context/authContext';
import { getUserPosts } from '../api/postApi';

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(user.id).then((data) => setPosts(data));
  }, [user.id]);

  return (
    <>
      {posts.map((post) => (
        <div className="max-w-full mx-auto my-8 p-3 border-b-[1px] border-slate-300">
          <div key={post.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div>
              <div className="font-bold text-lg mb-2">{post.title}</div>
              <div className="text-sm mb-2 flex gap-1">
                <p className="text-slate-800 font-semibold">Publication Date:</p>
                <p className="text-slate-700">{moment(post.publication_Date).format('LL')}</p>
              </div>
              <p>{post.content}</p>
            </div>
            <div className="flex justify-end">
              <Image src={post.image_Url} alt={post.title} width={260} height={192} className="w-full md:w-auto md:h-48 object-cover" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
