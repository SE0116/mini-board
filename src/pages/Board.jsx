// App.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Board.css'

const Board = () => { 
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;
  
  // 페이지 이동 핸들러
  const handleBoardClick = () => {
    navigate('/board');
  };
  const handleFAQClick = () => {
    navigate('/faq');
  };
  
  // 로그아웃 핸들러
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    
    if (confirmLogout) {
      alert('로그아웃 성공');
      navigate('/');
    }
  };

  // 게시글 상태 및 관리 함수들
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [newTitle, setNewTitle] = useState(''); // 새 게시글 제목
  const [selectedCategory, setSelectedCategory] = useState(''); // 새 게시글 카테고리
  const [newPost, setNewPost] = useState(''); // 새 게시글 내용
  const [newAuthor, setNewAuthor] = useState(''); // 새 게시글 작성자
  const [editIndex, setEditIndex] = useState(null); // 수정 중인 게시글의 인덱스

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  
  // 페이지 로드 시 실행되는 효과
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts.reverse());
    
    // 게시글이 있는 경우, New 표시 여부 설정
    if (storedPosts.length > 0) {
      setNewPostStatus(storedPosts.reverse());
    }
  }, []);
  
  // 새 게시글에 New 표시 여부를 설정하는 함수
  const setNewPostStatus = (posts) => {
    const currentTime = new Date().getTime();
    const updatedPosts = posts.map((post) => {
      const isNew = currentTime - post.timestamp < 5000;
      return { ...post, isNew };
    });
    
    setPosts(updatedPosts);
  }
  
  // 새 게시글 추가 함수
  const addPost = async () => {
    if (newPost.trim() !== '' && newAuthor.trim() !== '' && selectedCategory !== '') {
      setIsLoading(true);
      
      const timestamp = new Date().getTime(); // 현재 시간을 timestamp로 저장
      const updatedPosts = [ { title: newTitle, content: newPost, author: newAuthor, category: selectedCategory, timestamp }, ...posts ];
      
      setTimeout(() => {
        setPosts(updatedPosts);
        setNewPostStatus(updatedPosts);
        setNewTitle('');
        setSelectedCategory('');
        setNewPost('');
        setNewAuthor('');
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setIsLoading(false); // 로딩 종료
      }, 2000); // 2초 후에 실행
    }
  };
  
  // 게시글 수정 함수
  const editPost = (index) => {
    const postIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    setEditIndex(postIndex);
    setNewTitle(posts[postIndex]?.title || '');
    setSelectedCategory(posts[postIndex]?.category || '');
    setNewPost(posts[postIndex]?.content || '');
    setNewAuthor(posts[postIndex]?.author || '');
  };
  
  // 게시글 업데이트 함수
  const updatePost = () => {
    if (newPost.trim() !== '' && newAuthor.trim() !== '' && editIndex !== null && selectedCategory !== '') {
      setIsLoading(true);
      
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = { ...updatedPosts[editIndex], title: newTitle, content: newPost, author: newAuthor, category: selectedCategory };
      
      setTimeout(() => {
        setPosts(updatedPosts);
        setNewPostStatus(updatedPosts);
        setNewTitle('');
        setSelectedCategory('');
        setNewPost('');
        setNewAuthor('');
        setEditIndex(null); // 수정이 끝났으므로 editIndex 초기화
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setIsLoading(false);
      }, 1000);
    }
  };
  
  // 게시글 삭제 함수
  const deletePost = async (index) => {
    setIsLoading(true); // 로딩 시작
    
    // 로딩 상태를 변경하고 나서 데이터 삭제 로직 실행
    // 테스트를 위해 setTimeout 사용 (실제로는 서버와 통신 등의 로직이 들어갈 것)
    setTimeout(() => {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
      setNewPostStatus(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setIsLoading(false); // 로딩 종료
    }, 2000); // 2초 후에 실행
  };
  
  // 타임스탬프를 형식화하는 함수
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // 페이지 관련 상태 및 함수들
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }
  const paginatedPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  return (
    <div className="board-container">
      <div className="button-group">
        <button className='board-button1' onClick={handleBoardClick}>게시판</button>
        <button className='faq-button1' onClick={handleFAQClick}>FAQ</button>
        <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
      </div>
      <br /><br /><br /><br /><br /><br />
      <div className="guide">게시판</div>

      {/* 게시글 목록을 표시하는 테이블 */}
      <table className='table-container'>
        <thead>
          <tr>
            <th></th>
            <th>제목</th>
            <th>카테고리</th>
            <th>게시물 내용</th>
            <th>작성자</th>
            <th>작성 시간</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* 각각의 게시글을 표시 */}
          {paginatedPosts.map((post, index) => (
            <tr key={post.id}>
              {/* New 표시 셀 */}
              <td className='new-cell'>
                {post.isNew && <span className="new-post-label">NEW!</span>}
              </td>
              {/* 제목, 카테고리, 내용, 작성자, 작성 시간, 수정/삭제 버튼 */}
              <td className='title-cell'>{post.title}</td>
              <td className='category-cell'>{post.category}</td>
              <td className='content-cell'>{post.content}</td>
              <td className='author-cell'>{post.author}</td>
              <td className='timestamp-cell'>{formatTimestamp(post.timestamp)}</td>
              <td className='ud-cell'>
                {/* 수정 버튼 */}
                <button className="crud-button" onClick={() => editPost(index)}>
                  수정
                </button>
                {/* 삭제 버튼 */}
                <button className="crud-button" onClick={() => deletePost(index)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br /><br />

      {/* 페이지 이동 버튼 */}
      <div>
        <button
          className='paginate-button'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          >
          이전 페이지
        </button>
        &nbsp;
        <span>{`${currentPage} / ${totalPages}`}</span>
        &nbsp;&nbsp;
        <button
          className='paginate-button'
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          >
          다음 페이지
        </button>
      </div>
      <br /><br />
      {isLoading && <span>Loading...</span>}
      <br /><br /><br /><br /><br />
      
      {/* 새 게시글 작성을 위한 입력 폼 */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">카테고리 선택</option>
        <option value="카테고리1">카테고리1</option>
        <option value="카테고리2">카테고리2</option>
        <option value="카테고리3">카테고리3</option>
        <option value="카테고리4">카테고리4</option>
        {/* 다른 카테고리 옵션들 추가 */}
      </select>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="제목"
        />
      <input
        className="input-content"
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="게시물 내용"
        />
      <input
        type="text"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        placeholder="작성자명"
        />
      
      <br />
      {/* 글쓰기 또는 수정 버튼 */}
      <button className='edit-button' onClick={editIndex !== null ? updatePost : addPost} disabled={isLoading}>{editIndex !== null ? '수정' : '글쓰기'}</button>
      <br /><br /><br />
    </div>
  );
};

export default Board;
