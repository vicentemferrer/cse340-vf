async function serverError(req, res) {
    throw new Error('Oh no! It seems we got stucked. Try another route.')
}

module.exports = { serverError }