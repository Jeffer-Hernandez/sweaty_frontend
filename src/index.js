const endPoint = "http://localhost:3000/api/v1/comments";

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is Loaded")
  getDiscussions()

  const createCommentForm = document.querySelector("#create-comment-form")
  createCommentForm.addEventListener("submit", (e) => createFormHandler(e))

  const commentContainer = document.querySelector('#discussion-container')
  commentContainer.addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id);
    const comment = Comment.findById(id);
    document.querySelector('#update-comment').innerHTML = comment.renderUpdateForm();

    // listen for the submit event of the edit form and handle the data
    document.querySelector('#update-comment').addEventListener('submit', e => updateFormHandler(e))
  });
});

function getDiscussions() {
  fetch(endPoint)
  .then(res => res.json())
  .then(json => {
  // JSON data will be nested due to Serializer
  json.data.forEach(comment => {
  let newComment = new Comment(comment, comment.attributes)
  document.querySelector('#discussion-container').innerHTML += newComment.render()
    })
  })
}

function createFormHandler(e){
  e.preventDefault()

  const content_input = document.querySelector("#input-content").value
  const discussion_id = parseInt(document.querySelector("#discussions").value)
  const user_id = parseInt(document.querySelector("#users").value)
  // console.log(contentInput, userId, discussionId)
  postFetch(content_input, user_id, discussion_id )
}

function updateFormHandler(e) {
  e.preventDefault();

  const id = parseInt(e.target.dataset.id);
  const comment = Comment.findById(id);
  const content = e.target.querySelector('#input-content').value;
  const discussion_id = parseInt(e.target.querySelector('#discussions').value);
  const user_id = parseInt(e.target.querySelector('#users').value);
  patchComment(comment, content, user_id, discussion_id)
}
    
// arguments passed in should be concurrent with strong params function on backend for bodyData to work
function postFetch(content, user_id, discussion_id){
  const bodyData = {content, user_id, discussion_id}
  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(comment => {
  console.log(comment)

  commentData = comment.data
  // render JSON response
  let newComment = new Comment(commentData, commentData.attributes)

  document.querySelector('#discussion-container').innerHTML += newComment.render()
  })
}

function patchComment(comment, content, user_id, discussion_id) {
  const bodyJSON = { comment, content, user_id, discussion_id }
  fetch(endPoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyJSON),
  })
    .then(res => res.json())
    // our backend responds with the updated syllabus instance represented as JSON
    .then(updatedComment => {

      console.log(updatedComment)

    });
}




