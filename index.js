const { app, BrowserWindow, ipcMain } = require('electron')
const NodeRSA = require('node-rsa')
const si = require('systeminformation');
const path = require('path')

const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC8bKCAMt7glFNsY2PcQzoXHgI0V7ahrTdZJziZb4b6FfKp0FPtXNvudMI1+UPcW3TcNiHqquQ6NHmIO49oxOOCfP6tIaDK5bYDjHptptgicZ+/0V4GLl9dauAPNQ2WNy2bQ72Txhb5PsPKec5eHu//1TnCTKzMQm3a9lwd2sD9jupV3AjMFuVlKA9fvdB5zheJuyl6v7enKi+TojMnXdi55v/o7U3dQL6+9PDPNVcuft6palzZPFTcXlk0zZ5mGS/dIQBFfEadgXHx1eM1H2oGaVu6MjaVfc1SDMhmvkiUMtpDalOruS0Ij1WlNX1JeCEDOOtSVyNMxNfVMWjD3CI/DYsyU61Ita6WgP9ppjZoD7cu/CUi4eZPiYEn96I3ufS1UU/qaj497eubH+22Zkm7rJkDen3qbHvLRd1USu6DYSltKBRgXdxCdTvXTLUbOCSjavCR1IRUhcEc1hApnX2+NnnApNrCtH9tjNIaJhJqkrCf0v3HrYy9fIpqAgGsjaU= linwr19910608@126.com'

const privateKey = `-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----`

const encrypt = new NodeRSA(publicKey)

const decript = new NodeRSA(privateKey)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js')
    }
  })
  // win.loadURL('https://admin.test.pandabuy.com/')
  win.loadFile(path.resolve(__dirname, './index.html'))
}

app.whenReady().then(() => {
  ipcMain.on('sync-device-uuid', async (event, arg) => {
    const encryptData = encrypt.encrypt((await si.uuid()).hardware, 'base64');
    event.returnValue = decript.decrypt(encryptData, 'utf8')
  })
  createWindow()
})