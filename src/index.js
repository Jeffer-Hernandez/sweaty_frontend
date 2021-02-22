const endPoint = "http://localhost:3000/api/v1/comments";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is Loaded")
    getDiscussions()

    const createCommentForm = document.querySelector("#create-comment-form")

    createCommentForm.addEventListener("submit", (e) => createFormHandler(e))

});


function getDiscussions() {
    fetch(endPoint)
      .then(res => res.json())
      .then(json => {
        // JSON data will be nested due to Serializer
        json.data.forEach(comment => {
          let newComment = new Comment(comment, comment.attributes)
          render(comment)})
        })
      }

function render(comment){
  const discussionMarkup = `
          <div data-id=${comment.id}>
          <h3>from: ${comment.attributes.user.name}</h3>
          <h3>discussion: ${comment.attributes.discussion.title}</h3>
          <h3>comment:${comment.attributes.content}</h3>
          
          </div>
          <br><br>`;
  
            document.querySelector('#discussion-container').innerHTML += discussionMarkup
        
}


function createFormHandler(e){
  e.preventDefault()

  const contentInput = document.querySelector("#input-content").value
  const discussionId = parseInt(document.querySelector("#discussions").value)
  const userId = parseInt(document.querySelector("#users").value)
  // console.log(contentInput, userId, discussionId)
  postFetch(contentInput, userId, discussionId )

}

// arguments passed in should be concurrent with strong params function on backend
// for bodyData to work
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
    render(commentData);
  })
}



