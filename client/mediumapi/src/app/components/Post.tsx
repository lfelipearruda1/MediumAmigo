import { FaThumbsUp, FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useQuery } from '@tanstack/react-query';

interface IPost {
  id: number;
  post_desc: string;
  img: string;
  username: string;
  userImg: string;
  created_at: string;
}

interface IComments {
  id: number;
  comment_desc: string;
  user_img: string;
  comment_user_id: number;
  username: string;
  post_id: number;
  created_at: string;
}

function Post(props: { post: IPost }) {
  const { post_desc, img, username, userImg, created_at, id } = props.post;
  const { user } = useContext(UserContext);
  const [ comment_desc, setComment_desc ] = useState('');

  const {} = useQuery<IComments[] | undefined>({
    queryKey: ['comments', id] //AULA 8 MIN 26:13
  })

return (
  <div className='w-1/3 bg-white rounded-lg p-4 shadow-md'>
    <header className='flex gap-2 pb-4 border-b items-center'>
      <img
        className='w-8 h-8 rounded-full'
        src={
          userImg
            ? userImg
            : "https://img.freepik.com/free-icon/user_318-159711.jpg"
        }
        alt="Imagem do usuário que fez o post."
      />
      <div className='flex flex-col'>
        <span className='font-semibold'>{username}</span>
        <span className='text-xs'> {moment(created_at).fromNow()}</span>
      </div>
    </header>
    {post_desc && (
      <div className='py-4 w-full'>
        <span>{post_desc}</span>
      </div>
    )}
    {img && (
      <img
      className='rounded-lg'
      src={`./upload/${img}`}
      alt='Imagem do post. '
      />
    )}
    <div className='flex justify-between py-4 border-b'>
      <div className='flex gap-1 items-center'>
        <span className='bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-center rounded-full text-xs'>
          <FaThumbsUp/>
        </span>
      </div>
      <span>5 comentários</span>
    </div>
    <div className='flex justify-around py-4 text-gray-600 border-b'>
    <button className='flex items-center gap-1'>
      <FaThumbsUp /> Curtir
    </button>
    <button className='flex items-center gap-1'>
      <FaThumbsUp /> Comentar
    </button>
    </div>
    <div className='flex gap-4 pt-6'>
      <img
      src={
        user?.userImg
          ? user.userImg
          : "https://img.freepik.com/free-icon/user_318-159711.jpg"
      }
      alt= "Imagem do Perfil"
      className='w-8 h-8 rounded-full'
      />
      <div className='w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full'>
        <input
        type="text"
        className='bg-zinc-100 w-full focus-visible:outline-none'
        value={comment_desc}
        onChange={(e)=> setComment_desc(e.target.value)}
        placeholder='Comente...'
        />
        <FaPaperPlane />
      </div>
    </div>
  </div>
)}