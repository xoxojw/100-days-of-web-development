const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', async (req, res) => {
  const query = `
    SELECT posts.*, authors.name AS author_name FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
  `;
  const [posts] = await db.query(query);
  res.render('posts-list', { posts });
});

router.get('/new-post', async (req, res) => {
  try {
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', { authors });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/posts', async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  // db.query에 보내는 두 번째 매개변수가 ?안의 값을 대체
  await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data]);

  res.redirect('/posts');
});

// Get post details
router.get('/posts/:id', async (req, res) => {
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `;

  // 우리는 query의 결과로 가져온 데이터가 1개뿐일 것이라는 걸 알지만,
  // MySQL은 그렇지 않기 때문에 배열의 형태로 데이터를 반환한다.
  // -> 하나의 게시글만 가지고 있을지라도 게시글들의 배열이라는 것을 분명하게 해주는 것이 좋다.
  const [posts] = await db.query(query, [req.params.id]);

  // 예외 처리 잊지 말기!
  if (!posts || posts.length === 0) {
    return res.status(404).render('404');
  }

  // 다른 요소는 그대로, date 형식 변환
  // toISOString과 toLocaleDateString에 대해서는 md파일에 따로 정리
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString('ko-KR', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  };

  res.render('post-detail', { post: postData });
});

// Move to edit post page
router.get('/posts/:id/edit', async (req, res) => {
  const query = `
    SELECT * FROM posts WHERE id = ?
  `;

  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render('404');
  }

  res.render('update-post', { post: posts[0] });
});

// Update the post
router.post('/posts/:id/edit', async (req, res) => {
  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE id = ?
  `;

  const updateData = [req.body.title, req.body.summary, req.body.content, req.params.id];

  await db.query(query, updateData);

  res.redirect('/posts');
})

// Delete the post
router.post('/posts/:id/delete', async (req, res) => {
  const query = `DELETE FROM posts WHERE id = ?`;

  await db.query(query, [req.params.id]);

  res.redirect('/posts');
})

module.exports = router;