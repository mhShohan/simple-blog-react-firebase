import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export default function Home({ isAuth }) {
  const [postsList, setPostsList] = useState([]);

  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const blogs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostsList(blogs);
    };
    getPosts();
  }, [postCollectionRef]);

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postsList.length <= 0 && (
        <h1 style={{ textAlign: 'center', marginTop: '40px' }}>
          No Post To show..
        </h1>
      )}
      {postsList.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <h2>{post.title}</h2>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <h1 onClick={() => deletePost(post.id)}>&#128465; </h1>
            )}{' '}
          </div>
          <p>{post.description}</p>
          <h4>@{post.author.name}</h4>
        </div>
      ))}
    </div>
  );
}
