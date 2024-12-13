module.exports = (user) => {
    return {
        id: user.id,
        login: user.login,
        role: user.role_id,
        registraed_at: user.createdAt
    }
}   