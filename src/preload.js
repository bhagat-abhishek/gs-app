// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    fetchData: (text) => ipcRenderer.send("fetchData", text),
    fetchDataResponse: (callback) => ipcRenderer.on('fetchDataResponse', (_event, value) => callback(value)),
    fetchDataError: (callback) => ipcRenderer.on('fetchDataError', (_event, value) => callback(value)),
});
