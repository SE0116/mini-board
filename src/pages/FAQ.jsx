// App.jsx
import React, { useState } from 'react';
import './FAQ.css'
import { useNavigate } from 'react-router-dom';

const App = () => { 
  const navigate = useNavigate();

  const handleBoardClick = () => {
    navigate('/board');
  };
  const handleFAQClick = () => {
    navigate('/faq');
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    
    if (confirmLogout) {
      alert('로그아웃 성공');
      navigate('/login');
    }
  };
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    { id: 1, title: '여기는 어디인가요?', content: '개인 공부용 게시판 웹입니다.' },
    { id: 2, title: '이 웹은 무엇으로 만들어졌나요?', content: 'React를 사용해 만들어졌습니다.' },
    // 추가적인 게시글 데이터
  ];

  const handlePostClick = (postId) => {
    // 게시글 제목을 클릭할 때 해당 게시글의 ID를 상태에 저장
    setSelectedPost((prevSelectedPost) =>
      prevSelectedPost === postId ? null : postId
    );
  };


  return (
    <div className='faq-container'>
      <div className="button-group">
        <button className='board-button2' onClick={handleBoardClick}>게시판</button>
        <button className='faq-button2' onClick={handleFAQClick}>FAQ</button>
        <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
      </div>
      <br /><br /><br />
      <div className="guide1">FAQ</div>
      <p>
        {posts.map((post) => (
          <p key={post.id} onClick={() => handlePostClick(post.id)}>
            <br />
            {post.title}
            {selectedPost === post.id && (
              <div className='faq-content'>
                <p>{post.content}</p>
              </div>
            )}
          </p>
        ))}
      </p>
    </div>
    
  );
};

export default App;
