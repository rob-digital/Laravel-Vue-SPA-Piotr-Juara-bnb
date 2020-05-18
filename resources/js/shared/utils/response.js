export const is404 = function(err) {
   return isErrorResponseAndStatus(err) && 404 === err.response.status
}

export const is422 = (err => isErrorResponseAndStatus(err) && 422 === err.response.status)

const isErrorResponseAndStatus = function(err) {
   return err.response && err.response.status
}
