assert = require 'assert'
should = require('chai').should()

describe 'hangouts', ->
  it 'should have a reader', ->
    hangouts.HangoutReader.should.not.be.undefined