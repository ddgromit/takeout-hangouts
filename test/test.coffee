assert = require 'assert'
should = require('chai').should()
hangouts = require '../lib/hangout.js'

describe 'hangouts', ->
  it 'should have a reader', ->
    hangouts.HangoutReader.should.not.be.undefined