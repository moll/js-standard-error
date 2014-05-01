module.exports = StandardError

function StandardError(msg, props) {
  // Let all properties be enumerable for easier serialization.
  if (msg && typeof msg == "object") props = msg, msg = undefined
  else this.message = msg

  // Name has to be an own property (or on the prototype a single step up) for
  // the stack to be printed with the correct name.
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)
  if (props) for (var key in props) this[key] = props[key]
}

StandardError.prototype = Object.create(Error.prototype, {
  constructor: {value: StandardError, configurable: true, writable: true}
})
