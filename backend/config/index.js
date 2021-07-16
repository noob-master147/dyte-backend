module.exports = () => {
    if (!process.env.NODE_ENV)
        process.env.NODE_ENV = 'development'
    return require(`./${process.env.NODE_ENV}`)
}