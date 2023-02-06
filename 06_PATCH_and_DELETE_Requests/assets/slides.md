---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: false
title: "P1L6 - PATCH & DELETE Requests slides"
height: 900
width: 1400
---

## PATCH & DELETE Requests

---

## Lecture Goals

- Review how to send a PATCH request using HTML forms and JavaScript
- Review how to send a DELETE request using HTML buttons and JavaScript
- Explain the difference between optimistic and pessimistic rendering

---

<img 
  src="fetch-delete-diagram.drawio.svg"
  alt="Fetch Diagram for Delete"
  style="width: 90%"
/>

---

<img 
  src="fetch-patch-diagram.drawio.svg"
  alt="Fetch Diagram for Patch"
  style="width: 90%"
/>

---

<img
  src="render-book-to-update-book.drawio.svg"
  alt="Diagram comparing renderBook with updateBook"
  style="width: 90%"
/>

---

#### An Example
Run

```
cd 06_PATCH_and_DELETE_Requests/assets
json-server --watch db.json
```

<pre><code data-line-numbers>const commentList = document.querySelector('#comments');
document.querySelector('#refreshList').addEventListener('click', refreshList);
function refreshList() {
  commentList.innerHTML = "";
  fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
      comments.forEach(renderComment)
    })
}

function renderComment(comment) {
  const li = document.createElement('li');
  li.dataset.commentId = comment.id;
  li.textContent = `${comment.body} `;
  const likeBtn = document.createElement('button');
  likeBtn.textContent = likeButtonTextFor(comment);
  li.append(likeBtn);
  likeBtn.addEventListener('click', (e) => addLike(comment));
  commentList.append(li);
}

function addLike(comment) {
  fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: comment.likes + 1})
  })
    .then(res => res.json())
    .then(comment => {
      const btn = document.querySelector(`#comments li[data-comment-id="${comment.id}"] button`);
      btn.textContent = likeButtonTextFor(comment);
    })
}

function likeButtonTextFor(comment) {
  return `${comment.likes} like${comment.likes === 1 ? '' : 's'} `
}</code></pre>

<button id="refreshList">Click to Refresh List</button>
<ul id="comments">

</ul>

<script>
const commentList = document.querySelector('#comments');
document.querySelector('#refreshList').addEventListener('click', refreshList);
function refreshList() {
  commentList.innerHTML = "";
  fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
      comments.forEach(renderComment)
    })
}

function renderComment(comment) {
  const li = document.createElement('li');
  li.dataset.commentId = comment.id;
  li.textContent = `${comment.body} `;
  const likeBtn = document.createElement('button');
  likeBtn.textContent = likeButtonTextFor(comment);
  li.append(likeBtn);
  likeBtn.addEventListener('click', (e) => addLike(comment));
  commentList.append(li);
}

function addLike(comment) {
  fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: comment.likes + 1})
  })
    .then(res => res.json())
    .then(comment => {
      const btn = document.querySelector(`#comments li[data-comment-id="${comment.id}"] button`);
      btn.textContent = likeButtonTextFor(comment);
    })
}

function likeButtonTextFor(comment) {
  return `${comment.likes} like${comment.likes === 1 ? '' : 's'} `
}

</script>

---

### What's happening here?

<img
  src="stale-closure-diagram.drawio.svg"
  alt="Diagram describing stale closure issue"
  style="width: 90%"
/>

---

#### Fixing the Bug
Run

```
cd 06_PATCH_and_DELETE_Requests/assets
json-server --watch db.json
```

<pre><code data-line-numbers>const commentList = document.querySelector('#comments');
document.querySelector('#refreshList').addEventListener('click', refreshList);
function refreshList() {
  commentList.innerHTML = "";
  fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
      comments.forEach(renderComment)
    })
}

function renderComment(comment) {
  const li = document.createElement('li');
  li.dataset.commentId = comment.id;
  li.textContent = `${comment.body} `;
  const likeBtn = document.createElement('button');
  likeBtn.textContent = likeButtonTextFor(comment);
  li.append(likeBtn);
  likeBtn.addEventListener('click', (e) => addLike(comment));
  commentList.append(li);
}

function addLike(comment) {
  fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: comment.likes += 1})
  })
    .then(res => res.json())
    .then(comment => {
      const btn = document.querySelector(`#comments li[data-comment-id="${comment.id}"] button`);
      btn.textContent = likeButtonTextFor(comment);
    })
}

function likeButtonTextFor(comment) {
  return `${comment.likes} like${comment.likes === 1 ? '' : 's'} `
}</code></pre>

<button id="refreshListFixed">Click to Refresh List</button>
<ul id="commentsFixed">

</ul>

<script>
const commentListFixed = document.querySelector('#commentsFixed');
document.querySelector('#refreshListFixed').addEventListener('click', refreshListFixed);
function refreshListFixed() {
  commentListFixed.innerHTML = "";
  fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
      comments.forEach(renderComment)
    })
}

function renderComment(comment) {
  const li = document.createElement('li');
  li.dataset.commentId = comment.id;
  li.textContent = `${comment.body} `;
  const likeBtn = document.createElement('button');
  likeBtn.textContent = likeButtonTextFor(comment);
  li.append(likeBtn);
  likeBtn.addEventListener('click', (e) => addLikeFixed(comment));
  commentListFixed.append(li);
}

function addLikeFixed(comment) {
  fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: comment.likes += 1})
  })
    .then(res => res.json())
    .then(comment => {
      const btn = document.querySelector(`#commentsFixed li[data-comment-id="${comment.id}"] button`);
      btn.textContent = likeButtonTextFor(comment);
    })
}

function likeButtonTextFor(comment) {
  return `${comment.likes} like${comment.likes === 1 ? '' : 's'} `
}

</script>

---

<img
  src="stale-closure-fix-diagram.drawio.svg"
  alt="Diagram describing stale closure issue"
  style="width: 90%"
/>