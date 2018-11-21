# keybase-cli

This is a nice CLI for keybase chat.  You will need to have keybase installed and setup to use it.  After that:

```
npm i     # install it
npm start # start chat program
```

Eventually, I will package it a bit better.


## usage

Each box can have focus, you can scroll them with arrow keys, when it's focused. Press `ESC` or `Ctrl-C` to quit. Input is a bit wonky, but I'll be improving the core widgets to make them work better. Everything should work with the mouse.


## todo

* reactions
* attachments (including images)
* `delete` & `deletehistory` events
* secondary dialogs (settings, login, etc)
* handle groups
* handle git messages
