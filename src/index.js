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
        // remember our JSON data is a bit nested due to our serializer
        json.data.forEach(comment => {
          // double check how your data is nested in the console so you can successfully access the attributes of each individual object
          const discussionMarkup = `
          <div data-id=${comment.id}>
          <h3>from: ${comment.attributes.user.name}</h3>
          <h3>discussion: ${comment.attributes.discussion.title}</h3>
          <h3>comments:${comment.attributes.content}</h3>
          
          </div>
          <br><br>`;
  
            document.querySelector('#discussion-container').innerHTML += discussionMarkup
        })
      })
}

function createFormHandler(e){
  e.preventDefault()

  const contentInput = document.querySelector("#input-content").value
  const discussionId = parseInt(document.querySelector("#discussions").value)
  const userId = parseInt(document.querySelector("#users").value)

  postFetch(contentInput, discussionId, userId)

}

function postFetch(content_input, discussion_id, user_id){
  const bodyData = {content_input, discussion_id, user_id}
  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(comment => {
    console.log(comment);
    // const commentData = comment.data
    // render JSON response
    const discussionMarkup = `
    <div data-id=${comment.id}>
    <h3>from: ${comment.attributes.user.name}</h3>
    <h3>discussion: ${comment.attributes.discussion.title}</h3>
    <h3>comments:${comment.attributes.content}</h3>
    
    </div>
    <br><br>`;

      document.querySelector('#discussion-container').innerHTML += discussionMarkup
  })

}