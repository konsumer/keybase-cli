import { exec, spawn } from 'child_process'

// TODO: it would be cool if the output were labeled to command
// so I could keep a pipe open, but the way things are, it has to
// be one spawn per request

// start a chat pipe
const chat = (method, params) => new Promise((resolve, reject) => {
  const kb = spawn('keybase', ['chat', 'api'])
  let out = Buffer.from([])
  kb.stdout.on('data', c => {
    out = Buffer.concat([out, c])
  })
  kb.stdout.on('end', () => {
    if (out && out.toString() && out.toString() !== '') {
      resolve(JSON.parse(out.toString()))
    }
  })
  kb.stdout.on('error', reject)
  kb.stdin.write(JSON.stringify({ method, params }))
  kb.stdin.end()
})

export const attach = (params = {}) => chat('attach', params)
export const deleteMsg = (params = {}) => chat('delete', params)
export const download = (params = {}) => chat('download', params)
export const edit = (params = {}) => chat('edit', params)
export const list = (params = {}) => chat('list', params)
export const mark = (params = {}) => chat('mark', params)
export const reaction = (params = {}) => chat('reaction', params)
export const read = (params = {}) => chat('read', params)
export const searchInbox = (params = {}) => chat('searchinbox', params)
export const searchRegexp = (params = {}) => chat('searchregexp', params)
export const sendMsg = (params = {}) => chat('send', params)
export const setStatus = (params = {}) => chat('setstatus', params)

// get current client-status
export const status = () => new Promise((resolve, reject) => {
  exec('keybase status -j', (err, stdout, stderr) => {
    if (err) {
      return reject(err)
    }
    resolve(JSON.parse(stdout))
  })
})

// subscribe to message events, return unsubscribe function
export const subscribe = (params = {}) => {
  const cmd = ['chat', 'api-listen']
  if (params.exploding) { cmd.push('--exploding') }
  if (params.local) { cmd.push('--local') }
  const kb = spawn('keybase', cmd)
  if (params.onMessage) {
    kb.stdout.on('data', d => {
      params.onMessage(JSON.parse(d.toString()))
    })
  }
  if (params.onError) {
    kb.stdout.on('error', params.onError)
  }
  return () => kb.kill()
}
