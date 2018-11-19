import React from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import { KeybaseProvider } from './keybase_context'
import ChannelList from './ChannelList'
import ChatArea from './ChatArea'
import InputArea from './InputArea'
import theme from './themes/default'

const render = createBlessedRenderer(blessed)

const App = () => (
  <element>
    <ChannelList width='20%' left='80%' height='100%-3' {...theme.ChannelList} />
    <ChatArea width='80%' height='100%-3' {...theme.ChatArea} />
    <InputArea top='100%-3' height={3} width='100%' {...theme.InputArea} />
  </element>
)

const screen = blessed.screen({
  title: 'Keybase Chat',
  // dump: `${__dirname}/dump.log`,
  autoPadding: true,
  smartCSR: true,
  warnings: true
})

screen.key(['escape', 'C-c'], function (ch, key) {
  return process.exit(0)
})

render(<KeybaseProvider><App /></KeybaseProvider>, screen)
