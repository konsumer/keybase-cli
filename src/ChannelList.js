import React from 'react'

import { withKeybase } from './keybase_context'

const ChannelList = ({ info, channels, currentChannel, setChannel, ...props }) => {
  if (!info) {
    return null
  }
  const itemsRaw = (channels || [])
    .filter(c => c && c.channel && c.channel.name)
    .map(c => c.channel.name)

  const items = itemsRaw.map(c => {
    if (c === info.Username) {
      return 'NOTES'
    }
    return c.split(',').filter(u => u !== info.Username).join(',')
  })

  const onSelect = (item) => {
    setChannel(itemsRaw[items.indexOf(item.content)])
  }

  return (
    <list tags items={items} mouse keys onSelect={onSelect} {...props} />
  )
}

export default withKeybase(ChannelList)
