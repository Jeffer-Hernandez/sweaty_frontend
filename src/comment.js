class Comment {

    constructor(comment, commentAttributes){

        this.id = comment.id
        this.content = commentAttributes.content
        this.user = commentAttributes.user
        this.discussion = commentAttributes.discussion
        Comment.all.push(this)
    }

    render(){
        console.log(this)
        return  `
                <div data-id=${this.id}>
                <h3>from: ${this.user.name}</h3>
                <h3>discussion: ${this.discussion.title}</h3>
                <h3>comment:${this.content}</h3>
                
                </div>
                <br><br>`;  
    }




}

Comment.all = []