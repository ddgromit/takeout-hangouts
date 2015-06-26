import _ from 'lodash';
import tsToDate from './utils/tsToDate';

export default class HangoutReader {
  constructor(data) {
    this.data = data
  }

  conversations() {
    return _.map(this.data.conversation_state, (convo_obj) => {
      return new Conversation(convo_obj.conversation_state);
    });
  }

  conversation(id) {
    return _.find(this.conversations(), (convo) => {
      return convo.id() == id;
    });
  }
}


class Conversation {
  constructor(data) {
    this.data = data;
  }

  name() {
    return this.data.conversation.name;
  }

  id() {
    return this.data.conversation.id.id;
  }

  isGroupChat() {
    this.data.conversation.type == "GROUP";
  }

  lastReadAt() {
    return tsToDate(this.data.conversation.self_conversation_state.self_read_state.latest_read_timestamp);
  }

  createdAt() {
    return tsToDate(this.data.conversation.self_conversation_state.active_timestamp);
  }

  sortTime() {
    return tsToDate(this.data.conversation.self_conversation_state.sort_timestamp);
  }

  messages() {
    return this.data.event
      .map((e) => { return messageFactory(e) });
  }
}

function messageFactory(event) {
  switch (event.event_type) {
    case "REGULAR_CHAT_MESSAGE":
      return new ChatMessage(event);
      break;
    case "RENAME_CONVERSATION":
      return new Message(event);
      break;
    case "START_HANGOUT":
      return new Message(event);
      break;
    case "END HANGOUT":
      return new Message(event);
      break;
    default:
      return new Message(event);
  }
  return new Message(event);
}

class Message {
  constructor(data) {
    this.data = data;
  }

  id() {
    return this.data.event_id;
  }

  senderId() {
    return this.data.sender_id.chat_id;
  }

  sentAt() {
    return tsToDate(this.data.timestamp);
  }

  eventType() {
    return this.data.event_type;
  }
}

class ChatMessage extends Message {
  constructor(data) {
    super(data);
  }

  allText() {
    return this.segments()
      .map((segment) => { return segment.text })
      .join(',');
  }

  segments() {
    let segments = this.data.chat_message.message_content.segment;
    return segments ? segments : [];
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
