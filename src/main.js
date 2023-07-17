window.onload = function() {
  document.querySelector('#rerfer').onclick = function() {
    const res = window.electronAPI.getDeviceUuid('message')
    alert(res)
  }
}