class Comment {

    constructor(comment, commentAttributes){

        this.id = comment.id
        this.content = commentAttributes.content
        this.user = commentAttributes.user
        this.discussion = commentAttributes.discussion
        Comment.all.push(this)
    }

    static findById(id) {
        return this.all.find(comment => id === id);
    }

    render(){
        console.log(this)
        return  `
                <div data-id=${this.id}>
                <h3>from: ${this.user.name}</h3>
                <h3>discussion: ${this.discussion.title}</h3>
                <h3>comment:${this.content}</h3>
                <button data-id=${this.id} type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <br><br>`;  
    }


    renderUpdateForm() {
        return `
        <form data-id=${this.id} >
          <h3>Create a Comment!</h3>
          <br><br>
          
          <textarea id='input-content' name="content" rows="8" cols="80" value="" placeholder="What's on your mind?"></textarea>
          <br><br>

    
          <label>Discussion</label>
          <select id="discussions" name="discussions">
            <option value="1">Discussion 1</option>
            <option value="2">Discussion 2</option>
            <option value="3">Discussion 3</option>
            <option value="4">Discussion 4</option>
          </select>
          <br><br>

          <select id="users" name="users">
            <option value="1">Jeff</option>
          </select>
          <br><br>
    
          <input id='edit-button' type="submit" name="submit" value="Edit Comment" class="submit">

        </form>
      `;
    }
}

Comment.all = []