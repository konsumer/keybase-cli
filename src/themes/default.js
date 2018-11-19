// eventually, this will be configurable
export default {
  ChannelList: {
    border: {
      type: 'line'
    },
    style: {
      item: {
        fg: 'white',
        bg: '#000000'
      },
      selected: {
        fg: '#000000',
        bg: 'white'
      },

      border: {
        fg: '#f0f0f0'
      }
    }
  },

  ChatArea: {
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: '#333333',
      border: {
        fg: '#f0f0f0'
      }
    },
    scrollbar: {
      ch: ' ',
      inverse: true
    }
  },

  InputArea: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  }
}
