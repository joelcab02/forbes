import React, { useState } from 'react';
import { ThumbsUpIcon, MessageCircleIcon } from 'lucide-react';
interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  likes: number;
  timeAgo: string;
  replies?: Comment[];
}
export function CommentsSection() {
  const [commentText, setCommentText] = useState('');
  const [nameText, setNameText] = useState('');
  const [sortBy, setSortBy] = useState('Top');
  const [comments, setComments] = useState<Comment[]>([{
    id: 1,
    author: 'Juan Hernández',
    authorImage: 'https://randomuser.me/api/portraits/men/28.jpg',
    content: 'Al inicio pensé que esto era como tantas cosas falsas que salen en internet, pero me registré porque era oficial de CFE. Me llamaron en menos de 5 minutos, me explicaron todo y la verdad fue muy sencillo. Ya recibí mi primer pago.',
    likes: 387,
    timeAgo: '27 min'
  }, {
    id: 2,
    author: 'María González',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Mi esposo y yo pusimos $1,000 entre los dos. A la semana ya vimos reflejados $200 de ganancia. No lo podíamos creer. Es la primera vez que siento que un programa del gobierno realmente nos beneficia directamente.',
    likes: 2497,
    timeAgo: '1 h'
  }, {
    id: 3,
    author: 'Carlos Méndez',
    authorImage: 'https://randomuser.me/api/portraits/men/55.jpg',
    content: 'Invertí $10,000 hace dos semanas y ya recibí mi primer pago puntual. El asesor fue muy claro desde el principio, todo muy transparente. Estoy pensando en meter más.',
    likes: 430,
    timeAgo: '3 h',
    replies: [{
      id: 31,
      author: 'Laura Vega',
      authorImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      content: 'Mi papá es jubilado y siempre desconfía de estas cosas, pero accedió a probar con poco. Ahora está feliz porque ya pudo ayudar a pagar la universidad de mi hermana. ¡Gracias CFE!',
      likes: 99,
      timeAgo: '27 min'
    }]
  }, {
    id: 4,
    author: 'Roberto Díaz',
    authorImage: 'https://randomuser.me/api/portraits/men/62.jpg',
    content: 'Como pensionado no me alcanza mucho. Este programa me cayó del cielo. Ahora cada mes recibo extra sin tener que hacer nada complicado, y todo directo a mi cuenta.',
    likes: 684,
    timeAgo: '4 h'
  }, {
    id: 5,
    author: 'Ana Martínez',
    authorImage: 'https://randomuser.me/api/portraits/women/42.jpg',
    content: 'Me registré ayer, el asesor me contactó rápido y ya quedó todo activado. La verdad pensé que sería complicado, pero es más fácil que abrir una cuenta de banco.',
    likes: 112,
    timeAgo: '4 h'
  }]);
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() !== '' && nameText.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        author: nameText,
        authorImage: 'https://randomuser.me/api/portraits/lego/1.jpg',
        content: commentText,
        likes: 0,
        timeAgo: 'Ahora'
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      setNameText('');
    }
  };
  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    }));
  };
  const renderComment = (comment: Comment, isReply = false) => <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-12 mt-4' : 'border-t border-gray-200 py-4'}`}>
      <div className="flex-shrink-0">
        <img src={comment.authorImage} alt={comment.author} className="w-10 h-10 rounded-full object-cover" />
      </div>
      <div className="flex-grow">
        <div className="font-medium text-gray-900">{comment.author}</div>
        <div className="my-1 text-gray-800 text-sm">{comment.content}</div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <button className="flex items-center hover:text-red-600 mr-4" onClick={() => handleLike(comment.id)}>
            <ThumbsUpIcon size={12} className="mr-1" />
            Me gusta
          </button>
          <button className="flex items-center hover:text-red-600 mr-4">
            <MessageCircleIcon size={12} className="mr-1" />
            Responder
          </button>
          <span className="text-gray-400">
            {comment.likes} · {comment.timeAgo}
          </span>
        </div>
      </div>
    </div>;
  return <div className="mt-12 mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-bold">Comentarios</h2>
        <div className="text-sm text-gray-500">619 comentarios</div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <div className="flex items-center text-xs">
          <span className="mr-2 text-gray-600">Ordenar por:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>Top</option>
            <option>Recientes</option>
            <option>Antiguos</option>
          </select>
        </div>
      </div>
      {/* Comment input */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 overflow-hidden">
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Tu avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow">
            <input type="text" placeholder="Tu nombre" value={nameText} onChange={e => setNameText(e.target.value)} className="w-full bg-gray-100 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm" />
            <textarea placeholder="Tu comentario" value={commentText} onChange={e => setCommentText(e.target.value)} className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm" rows={2} />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs">
            Comentar
          </button>
        </div>
      </form>
      {/* Comments list */}
      <div className="space-y-1">
        {comments.map(comment => <div key={comment.id}>
            {renderComment(comment)}
            {comment.replies?.map(reply => renderComment(reply, true))}
          </div>)}
      </div>
    </div>;
}