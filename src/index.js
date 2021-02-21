const endPoint = "http://localhost:3000/api/v1/boards";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is Loaded")
    getBoards()
});


// function getBoards() {
//   fetch(endPoint)
//     .then(res => res.json())
//     .then(json => console.log(json));
// }

function getBoards() {
    fetch(endPoint)
      .then(res => res.json())
      .then(json => {
        // remember our JSON data is a bit nested due to our serializer
        json.data.forEach(board => {
          // double check how your data is nested in the console so you can successfully access the attributes of each individual object
          const boardMarkup = `
            <div data-id=${board.id}>
              <h3>${board.attributes.title}</h3>
            </div>
            <br><br>`;
  
            document.querySelector('#board-container').innerHTML += boardMarkup
        })
      })
  }
