import React, { Component } from 'react'

import { sendMsg } from './keybase'
import { withKeybase } from './keybase_context'

class InputArea extends Component {
  onSubmit = () => {
    const body = this.text.value
    this.text.clearValue()
    sendMsg({ options: { channel: { name: this.props.currentChannel.channel.name }, message: { body } } })
  }

  render () {
    return (<textbox ref={r => { this.text = r }} onSubmit={this.onSubmit} keys mouse inputOnFocus {...this.props} />)
  }
}

export default withKeybase(InputArea)
