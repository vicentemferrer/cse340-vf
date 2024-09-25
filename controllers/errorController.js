async function serverError(req, res, next) {
    throw new Error('Oh no! It seems we got stucked. Try another route.')
}

module.exports = { serverError }