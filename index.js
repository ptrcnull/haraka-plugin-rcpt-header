exports.register = function () {
    this.register_hook('data_post', 'add_rcpt_header')
}

const HEADER_NAME = 'X-Recipients'

exports.add_rcpt_header = function (next, connection, params) {
    const trans = connection.transaction

    if (trans.header.headers[HEADER_NAME.toLowerCase()]) {
        return next()
    }

    const rcpt = trans.rcpt_to.join(',')
    this.loginfo('adding poop header: ' + rcpt)
    trans.add_header(HEADER_NAME, rcpt)

    return next()
}
