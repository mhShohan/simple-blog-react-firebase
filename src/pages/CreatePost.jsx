import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  const createpost = async (e) => {
    e.preventDefault();
    await addDoc(postCollectionRef, {
      title,
      description,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    });
    navigate('/');
  };

  return (
    <div className="createPostPage">
      <form onSubmit={createpost}>
        <h1>Create Your Post</h1>
        <div>
          <label htmlFor="">Title</label>
          <input
            placeholder="Title Here...."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Decription</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            placeholder="Decritption Here...."></textarea>
        </div>
        <button className="createPostBtn" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
