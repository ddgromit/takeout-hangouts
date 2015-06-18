'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var HangoutReader = (function () {
  function HangoutReader(data) {
    _classCallCheck(this, HangoutReader);

    this.data = data;
  }

  _createClass(HangoutReader, [{
    key: 'getFive',
    value: function getFive() {
      return 5;
    }
  }, {
    key: 'conversations',
    value: function conversations() {
      return _lodash2['default'].map(this.data.conversation_state, function (convo_obj) {
        return new Conversation(convo_obj.conversation_state);
      });
    }
  }, {
    key: 'conversation',
    value: function conversation(id) {
      return _lodash2['default'].find(this.conversations(), function (convo) {
        return convo.id() == id;
      });
    }
  }]);

  return HangoutReader;
})();

exports['default'] = HangoutReader;

var Conversation = (function () {
  function Conversation(data) {
    _classCallCheck(this, Conversation);

    this.data = data;
  }

  _createClass(Conversation, [{
    key: 'name',
    value: function name() {
      return this.data.conversation.name;
    }
  }, {
    key: 'id',
    value: function id() {
      return this.data.conversation.id.id;
    }
  }]);

  return Conversation;
})();

var Message = function Message() {
  _classCallCheck(this, Message);
};

var User = function User(id, name) {
  _classCallCheck(this, User);

  this.id = id;
  this.name = name;
};

module.exports = exports['default'];