import React, { Component, createContext } from 'react'

import * as keybase from './keybase'

export const context = createContext({})
export const { Provider, Consumer } = context

// TODO: use hooks for all this
// TODO: smarter handling of attachments, delete & deletehistory events & reactions
export class KeybaseProvider extends Component {
  state = {
    info: null,
    messages: [],
    channels: [],
    currentChannel: null
  }

  setChannel = async (channelName) => {
    if (channelName) {
      const currentChannel = this.state.channels.find(c => c && c.channel && c.channel.name === channelName)
      if (!currentChannel) {
        return
      }
      const m = (await keybase.read({ options: { channel: { name: channelName } } }))
      const messages = (m && m.result && m.result.messages && m.result.messages.map(m => m.msg)) || []
      messages.reverse()
      this.setState({ ...this.state, currentChannel, messages })
    }
  }

  async componentWillMount () {
    const channels = (await keybase.list()).result.conversations
    const info = await keybase.status()
    this.setState({ ...this.state, info, channels })
    this.setChannel(channels[0].channel.name)
    this.unsubscribe = keybase.subscribe({ onMessage: (msg) => {
      if (msg.msg.channel.name === this.state.currentChannel.channel.name) {
        this.setState({ ...this.state, messages: [ ...this.state.messages, msg.msg ] })
      }
    } })
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render () {
    const { children } = this.props
    return (<Provider value={{ ...this.state, setChannel: this.setChannel }}>{children}</Provider>)
  }
}

export const withKeybase = (Component) => props => (<Consumer>{ (kb) => (<Component {...props} {...kb} />) }</Consumer>)
