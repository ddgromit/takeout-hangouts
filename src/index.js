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
}

class Message {

}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
