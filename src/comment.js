class Comment {

    constructor(comment, commentAttributes){

        this.id = comment.id
        this.content = commentAttributes.content
        this.user = commentAttributes.user
        this.discussion = commentAttributes.discussion
    }
}