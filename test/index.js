import { assert } from 'chai';
import HangoutReader from '../src/index';

export default {
  'SmokeTest': {
    'tests should work': function() {
      assert.equal(1, 1);
    }
  },
  
  'HangoutReader': {
    'should be able to load': function() {
      let reader = new HangoutReader({conversation_state: [] });
    }
  }
}
