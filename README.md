## Hangouts

Hangouts reads the Google Takeout dump of your Google Hangouts data.  This includes conversations, the people in your conversations, and metadata about when video chats started and stoppped.

Google doesn't currently have an API for hangouts, so this is the only way to read your conversation history.

This library should be runnable both in node.js and in the browser (requires underscore.js)

## Getting your data

1. Load [Google Takeout](https://www.google.com/settings/takeout/custom)
2. Make sure "Hangouts" is selected and hit "Create Archive"
3. Extract Hangouts/Hangouts.json from the zip file

## Compiling

Install grunt:

  npm install -g grunt-cli && npm install grunt-contrib-coffee

Compile into the .js file:
  
  grunt coffee

Run tests:

  grunt mochaTest


