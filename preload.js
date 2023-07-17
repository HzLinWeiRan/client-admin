const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg) // 在 DevTools 控制台中打印“pong”
})

contextBridge.exposeInMainWorld('electronAPI', {
  getDeviceUuid: (msg) => {
    const res = ipcRenderer.sendSync('sync-device-uuid', msg)
    return res
  }
})