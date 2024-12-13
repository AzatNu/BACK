module.exports = (post) => {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        author: post.author,
        comments: post.comments,
        published_at: post.createdAt,
        updated_at: post.updatedAt
    }
}
