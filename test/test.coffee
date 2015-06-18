assert = require 'assert'
should = require('chai').should()
HangoutReader = require('..')

describe 'hangouts', ->
  it 'should have a reader', ->
    console.log(HangoutReader)
    HangoutReader.should.not.be.undefined