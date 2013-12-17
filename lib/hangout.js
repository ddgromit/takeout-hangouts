(function() {
  var Conversation, HangoutReader, Message, User, _;

  _ = require('underscore');

  HangoutReader = (function() {
    function HangoutReader(data) {
      this.data = data;
    }

    HangoutReader.prototype.conversations = function() {
      return _(this.data.conversation_state).map(function(convo_obj) {
        return new Conversation(convo_obj.conversation_state);
      });
    };

    return HangoutReader;

  })();

  Conversation = (function() {
    function Conversation(data) {
      this.data = data;
    }

    Conversation.prototype.name = function() {
      return this.data.conversation.name;
    };

    Conversation.prototype.participants = function() {
      return _.map(this.data.conversation.participant_data, function(participant) {
        return new User(participant.id.gaia_id, participant.fallback_name);
      });
    };

    Conversation.prototype.participantNames = function() {
      return _.map(this.participants(), function(participant) {
        return participant.name;
      });
    };

    Conversation.prototype.participantById = function(id) {
      return _(this.participants()).chain().filter(function(p) {
        return p.id === id;
      }).first().value();
    };

    Conversation.prototype.currentParticipants = function() {
      var _this = this;
      return _.map(this.data.conversation.current_participant, function(p) {
        return _this.participantById(p.gaia_id);
      });
    };

    Conversation.prototype.messages = function() {
      var _this = this;
      return _(this.data.event).map(function(e) {
        var sender;
        sender = _this.participantById(e.sender_id.gaia_id);
        return new Message(e, sender);
      });
    };

    return Conversation;

  })();

  Message = (function() {
    function Message(data, sender) {
      this.data = data;
      this.sender = sender;
    }

    Message.prototype.text = function() {
      if (this.type() === "chat_message") {
        return _(this.data.chat_message.message_content.segment).pluck("text").join(" ");
      } else {
        return "";
      }
    };

    Message.prototype.prettyText = function() {
      return "" + (this.date()) + " " + this.sender.name + ": " + (this.text());
    };

    Message.prototype.segmentCount = function() {
      if (this.type() === "chat_message" && this.data.chat_message.message_content.segment) {
        return this.data.chat_message.message_content.segment.length;
      } else {
        return 0;
      }
    };

    Message.prototype.type = function() {
      var keys;
      keys = _(this.data).keys();
      if (_(keys).contains("chat_message")) {
        return "chat_message";
      } else if (_(keys).contains("membership_change")) {
        return "membership_change";
      } else if (_(keys).contains("hangout_event")) {
        return "hangout_event";
      } else {
        if (_(keys).contains("conversation_rename")) {
          return "hangout_event";
        }
      }
      throw new Error("message type not recognized: " + keys.join(", "));
    };

    Message.prototype.date = function() {
      var seconds;
      seconds = parseInt(this.data.timestamp) / 1000;
      return new Date(seconds);
    };

    return Message;

  })();

  User = (function() {
    function User(id, name) {
      this.id = id;
      this.name = name;
    }

    return User;

  })();

  module.exports = HangoutReader;

}).call(this);
