import _ from 'lodash';

export default class ConversationSerializer {
  constructor(convo) {
    this.convo = convo;
  }

  header() {
    let name = this.convo.name();
    return `${name}\n${_.repeat('-',name.length)}`;
  }

  messages(limit) {
    let messages = this.convo.messages();
    if (limit) {
      messages = messages.slice(0,limit);
    }

    return messages.map((message) => {
      if (message.allText) {
        return `${message.id()}: ${message.allText()}`
      } else {
        return `${message.id()}: ${message.eventType()}`
      }
    }).join('\n')
  }
}
