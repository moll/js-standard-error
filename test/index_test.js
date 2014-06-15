var StandardError = require("..")

function ChildError(code, msg) { StandardError.apply(this, arguments) }

ChildError.prototype = Object.create(StandardError.prototype, {
  constructor: {value: ChildError, configurable: true, writeable: true}
})

describe("StandardError", function() {
  describe("new", function() {
    it("must be an instance of StandardError", function() {
      new StandardError().must.be.an.instanceof(StandardError)
    })

    it("must set message", function() {
      new StandardError("Problem").message.must.equal("Problem")
    })

    it("must set properties", function() {
      var err = new StandardError({message: "Problem", code: 500})
      err.message.must.equal("Problem")
      err.code.must.equal(500)
    })

    it("must set message and properties", function() {
      var err = new StandardError("Problem", {code: 500})
      err.message.must.equal("Problem")
      err.code.must.equal(500)
    })

    it("must set message from object given both", function() {
      var err = new StandardError("Problem", {message: "OK"})
      err.message.must.equal("OK")
    })

    it("must set name", function() {
      new StandardError().name.must.equal("StandardError")
    })

    it("must set name given emtpy object", function() {
      new StandardError({}).name.must.equal("StandardError")
    })

    it("must set name from constructor", function() {
      new ChildError().name.must.equal("ChildError")
    })

    it("must set name from object", function() {
      var err = new StandardError("Problem", {name: "UnknownError"})
      err.name.must.equal("UnknownError")
    })

    it("must set stack", function() {
      var stack = new StandardError().stack.split(/\n\s*/)
      stack[0].must.equal("StandardError")
      stack[1].must.include("index_test.js")
    })

    it("must set stack given name from object", function() {
      var stack = new StandardError({name: "UnknownError"}).stack.split(/\n\s*/)
      stack[0].must.equal("UnknownError")
    })

    it("must set stack when subclassed", function() {
      var stack = new ChildError().stack.split(/\n\s*/)
      stack[0].must.equal("ChildError")
      stack[1].must.include("index_test.js")
      stack[2].must.not.include("index_test.js")
    })

    it("must set stack from object", function() {
      new ChildError({stack: "OMG"}).stack.must.equal("OMG")
    })
  })

  describe(".prototype.toString", function() {
    it("must return message", function() {
      var err = new StandardError("Problem")
      err.toString().must.equal("StandardError: Problem")
    })

    it("must return set name", function() {
      var err = new StandardError("Problem")
      err.name = "OtherError"
      err.toString().must.equal("OtherError: Problem")
    })
  })

  describe("JSON.stringify", function() {
    it("must serialize enumerable properties", function() {
      var err = JSON.stringify(new StandardError("Problem", {code: 404}))
      var obj = {name: "StandardError", message: "Problem", code: 404}
      JSON.parse(err).must.eql(obj)
    })
  })
})
