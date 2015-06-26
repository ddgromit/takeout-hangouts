import _ from 'lodash';

export default class HangoutReader {
  constructor(data) {
    this.data = data
  }

  getFive() {
    return 5;
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
    let ts = parseInt(this.data.conversation.self_conversation_state.self_read_state.latest_read_timestamp);
    return new Date(ts / 1000);
  }

  createdAt() {
    let ts = parseInt(this.data.conversation.self_conversation_state.active_timestamp);
    return new Date(ts / 1000);
  }

  sortTime() {
    let ts = parseInt(this.data.conversation.self_conversation_state.sort_timestamp);
    return new Date(ts / 1000);
  }

  messages() {

  }
}

class Message {

}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
