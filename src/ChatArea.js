import React, { Component } from 'react'
import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

import { withKeybase } from './keybase_context'

marked.setOptions({
  renderer: new TerminalRenderer()
})

class ChatArea extends Component {
  componentDidUpdate () {
    // scroll to bottom on update
    this.box && this.box.setScrollPerc(100)
  }

  render () {
    const { messages, currentChannel, ...props } = this.props
    const items = messages.filter(m => m && m.content && m.content.text && m.content.text.body).map(m => `{bold}${m.sender.username}{/bold}: ${marked(m.content.text.body.trim())}`)
    return (
      <box ref={r => { this.box = r }} scrollable alwaysScroll mouse tags content={items.join('')} {...props} />
    )
  }
}

export default withKeybase(ChatArea)
