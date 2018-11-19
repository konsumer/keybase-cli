import React, { Component } from 'react'

import { sendMsg } from './keybase'
import { withKeybase } from './keybase_context'

class InputArea extends Component {
  onSubmit = (value) => {
    const body = value
    this.text.clearValue()
    sendMsg({ options: { channel: { name: this.props.currentChannel.channel.name }, message: { body } } })
  }

  render () {
    this.text && this.text.readInput()
    return (<textbox ref={r => { this.text = r }} onSubmit={this.onSubmit} keys mouse inputOnFocus {...this.props} />)
  }
}

export default withKeybase(InputArea)
