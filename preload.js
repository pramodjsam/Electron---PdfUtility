const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification: (message) => {
      ipcRenderer.send("notify", message);
    },
  },
  progressSendApi: (channel, options) => {
    const validChannels = [
      "compress",
      "merge",
      "split",
      "remove",
      "pdfToJpg",
      "JpgToPdf",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, options);
    }
  },
  ProcessReceiveApi: (channel, func) => {
    const validChannels = [
      "JpgToPdf:progress",
      "JpgToPdf:completed",
      "JpgToPdf:failed",
      "pdfToJpg:progress",
      "pdfToJpg:completed",
      "pdfToJpg:failed",
      "remove:progress",
      "remove:completed",
      "remove:failed",
      "split:progress",
      "split:completed",
      "split:failed",
      "merge:progress",
      "merge:completed",
      "merge:failed",
      "compress:progress",
      "compress:completed",
      "compress:failed",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, ...args) => {
        func(...args);
      });
    }
  },
  removeEventApi: (channel, func) => {
    const validChannels = [
      "compress:progress",
      "compress:completed",
      "compress:failed",
      "merge:progress",
      "merge:completed",
      "merge:failed",
      "split:progress",
      "split:completed",
      "split:failed",
      "remove:progress",
      "remove:completed",
      "remove:failed",
      "pdfToJpg:progress",
      "pdfToJpg:completed",
      "pdfToJpg:failed",
      "JpgToPdf:progress",
      "JpgToPdf:completed",
      "JpgToPdf:failed",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, func);
    }
  },
});
