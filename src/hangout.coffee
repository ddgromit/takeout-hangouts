if window?
  _ = window._
else
  _ = require('underscore')

class HangoutReader
  constructor: (data) ->
    @data = data

  conversations: ->
    _(@data.conversation_state).map (convo_obj) ->
      new Conversation(convo_obj.conversation_state)

  conversationById: (id) ->
    _(@conversations()).chain().filter((conversation) -> conversation.id() == id).first().value()


class Conversation
  constructor: (data) ->
    @data = data

  name: -> @data.conversation.name

  id: -> @data.conversation.id.id

  participants: ->
    _.map @data.conversation.participant_data, (participant) ->
      new User(participant.id.gaia_id, participant.fallback_name)

  participantNames: ->
    _.map @participants(), (participant) ->
      participant.name

  participantById: (id) ->
    _(@participants()).chain().filter((p) ->
      p.id is id
    ).first().value()

  currentParticipants: ->
    _.map @data.conversation.current_participant, (p) =>
      @participantById p.gaia_id

  messages: ->
    _(@data.event).map (e) =>
      sender = @participantById(e.sender_id.gaia_id)
      new Message(e, sender)


class Message
  constructor: (data, sender) ->
    @data = data
    @sender = sender

  text: ->
    if @type() is "chat_message"
      _(@data.chat_message.message_content.segment).pluck("text").join " "
    else
      ""

  prettyText: -> "#{@date()} #{@sender.name}: #{@text()}"

  segmentCount: ->
    if @type() is "chat_message" and @data.chat_message.message_content.segment
      @data.chat_message.message_content.segment.length
    else
      0

  type: ->
    keys = _(@data).keys()
    if _(keys).contains("chat_message")
      return "chat_message"
    else if _(keys).contains("membership_change")
      return "membership_change"
    else if _(keys).contains("hangout_event")
      return "hangout_event"
    else return "hangout_event"  if _(keys).contains("conversation_rename")

    throw new Error("message type not recognized: " + keys.join(", "))

  date: ->
    seconds = parseInt(@data.timestamp) / 1000
    new Date(seconds)

class User
  constructor: (id, name) ->
    @id = id
    @name = name


root = if module? && module.exports? then module.exports else window
root.HangoutReader = HangoutReader
