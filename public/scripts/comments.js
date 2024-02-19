// 클라이언트 JavaScript
// Ajax 사용해서 댓글 GET, POST

const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');

const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createComementsList(comments) {
  const commentListElement = document.createElement('ol');

  for (const comment of comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = `
    <article class='comment-item'>
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
	const postId = loadCommentsBtnElement.dataset.postid;
	try {
		// 1. XMLHttpRequest 객체 사용 - 너무 투박하고 복잡함
		// 2. axios 라이브러리 사용 - 추가 설치 필요
		// 3. ✅ fetch 함수 사용 - 브라우저 내장
		const response = await fetch(`/posts/${postId}/comments`);

		if (!response.ok) {
			alert('Fetching comments failed!');
			return;
		}

		const responseData = await response.json();

		if (responseData && responseData.length > 0) {
			const commentsListElement = createComementsList(responseData);
			commentsSectionElement.innerHTML = '';
			commentsSectionElement.appendChild(commentsListElement);
		} else {
			commentsSectionElement.firstElementChild.textContent =
				'게시글에 달린 댓글이 없습니다. 새 댓글을 등록해주세요.';
		}
  } catch (error) {
    alert('Getting comments failed!');
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = loadCommentsBtnElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: { // HTTP 요청에 대한 메타 데이터 설정
        'Content-Type': 'application/json' // 클라이언트에서 서버로 전송하는 데이터가 JSON 형식임을 알려줌
      }
    });
    if (response.ok) {
      fetchCommentsForPost();
      commentTitleElement.value = '';
      commentTextElement.value = '';
    }
  } catch (error) {
    alert('댓글 등록 데이터를 전송하지 못했습니다. 다시 시도해주세요.');
  }
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);