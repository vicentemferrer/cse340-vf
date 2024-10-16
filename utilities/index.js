const jwt = require("jsonwebtoken")

require("dotenv").config()

const invModel = require('../models/inventory-model')

const enNumberFormat = num => new Intl.NumberFormat('en-US').format(num)

const Util = {}

Util.getNav = async () => {
    const data = await invModel.getClassifications()

    const list = data.reduce((acc, { id, name }, i, arr) => {
        acc += `<li><a href="/inv/type/${id}" title="See our inventory of ${name} vehicles">${name}</a></li>`

        if (i === arr.length - 1) acc += '</ul>'

        return acc
    }, '<ul><li><a href="/" title="Home page">Home</a></li>')

    return list
}

Util.buildClassificationGrid = async (data) => {
    const grid = !(data.length > 0) ?
        '<p class="notice">Sorry, no matching vehicles could be found.</p>' :
        data.reduce((acc, { id, make, model, thumbnail, price }, i, arr) => {
            const makeAndModel = `${make} ${model}`

            acc += '<li>'
            acc += `<a href="../../inv/detail/${id}" title="View ${makeAndModel} details"><img src="${thumbnail}" alt="Image of ${makeAndModel} on CSE Motors" loading="lazy" /></a>`
            acc += '<div class="namePrice">'
            acc += '<hr />'
            acc += `<h2><a href="../../inv/detail/${id}" title="View ${makeAndModel} details">${makeAndModel}</a></h2>`
            acc += `<span>$${enNumberFormat(price)}</span>`
            acc += '</div>'
            acc += '</li>'

            if (i === arr.length - 1) acc += '</ul>'

            return acc
        }, '<ul id="inv-display">')

    return grid
}

Util.buildVehicleDetailedView = async (data) => {
    let content
    if (data.length > 0) {
        const { make, model, description, image, price, miles, color } = data[0]
        const makeAndModel = `${make} ${model}`

        content = '<section id="vehicle-presentation">'
        content += `<picture><img src="${image}" alt="Image of ${makeAndModel} on CSE Motors" loading="lazy" /></picture>`
        content += '<article>'
        content += `<h2>${makeAndModel} Details</h2>`
        content += `<ul><li><strong>Price: $${enNumberFormat(price)}</strong></li>`
        content += `<li><strong>Description:</strong> ${description}</li>`
        content += `<li><strong>Color:</strong> ${color}</li>`
        content += `<li><strong>Miles:</strong> ${enNumberFormat(miles)}</li></ul>`
        content += '</article>'

        content += '</section>'
    } else {
        content += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
    }
    return content
}

Util.buildClassificationList = async (classification_id = null) => {
    const data = await invModel.getClassifications()

    const classificationList = data.reduce((acc, { id, name }, i, arr) => {
        acc += `<option value="${id}" ${(!!classification_id && id === classification_id) ? 'selected' : ''}>${name}</option>`

        if (i === arr.length - 1) acc += "</select>"

        return acc
    }, `<select name="classification_id" id="classificationList" required><option value="">Choose a Classification</option>`)

    return classificationList
}

Util.checkJWTToken = async (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
            if (err) {
                req.flash("Please log in")
                res.clearCookie("jwt")

                return res.redirect("/account/login")
            }

            res.locals.accountData = accountData
            res.locals.loggedin = 1

            next()
        })
    }

    next()
}

Util.checkLogin = async (req, res, next) => {
    if (!res.locals.loggedin) {
        req.flash("notice", "Please log in.")
        return res.redirect("/account/login")
    }

    next()
}

Util.checkCredentials = async (req, res, next) => {
    if (!res.locals.loggedin || res.locals.accountData["account_type"] === 'Client') {
        req.flash("notice", "Please log with appropriate credentials.")
        return res.redirect("/account/login")
    }

    next()
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

Util.handleServerErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(err => next({ status: 500, message: err.message }))

module.exports = Util