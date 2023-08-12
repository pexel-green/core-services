function error(res, status, body, headers) {
    for (const key of headers.keys()) {
        res.set(key, headers[key])
    }
    return res.status(status).json(body)
}

function success(res, status, body, headers) {
    for (const key of headers.keys()) {
        res.set(key, headers[key])
    }
    return res.status(status).json(body)
}

module.exports = { error, success }

