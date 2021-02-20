const endPoint = "http://localhost:3000/api/v1/boards"

document.addEventListener('DOMContentLoaded', () =>{
    fetch(endPoint)
})

// function getBoards(){
//     fetch(endPoint)
//     then(response => response.json())
    // then(boards => {
    //     console.log(boards);
    //     boards.data.forEach(board => {
    //         const boardMarkup = `
    //           <li>
    //             <h3>${board.title}
    //               <button>edit</button>
    //             </h3>
    //           </li>`;
      
    // document.querySelector('#board-container').innerHTML += boardMarkup;})
    // });
    // };
