const { app, BrowserWindow, ipcMain, Notification, Menu } = require("electron");
const path = require("path");
const { moveFilestoTemp } = require("./utils/moveFilesToTemp");

let win;
let isDev = false;
let isMac = process.platform === "darwin" ? true : false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload"),
    },
    icon: path.join(__dirname, "assets/icon2.ico"),
    // title: "",
  });

  win.loadFile("index.html");
}
const ignoredNode = /node_modules|[/\\]\./;
const ignoredOutput = /output|[/\\]\./;
const ignoredTempFile = /temp\/pdf|[/\\]\./;

if (!app.isPackaged) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    ignored: [ignoredNode, ignoredTempFile, ignoredOutput],
  });
}

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

app.on("ready", () => {
  createWindow();

  // const temp = app.getPath("temp");
  // console.log(temp.split("\\")[2]);

  // console.log(app.getPath("temp") + "\\pdftoolkit\\pdf\\");

  // console.log(app.getPath("temp")); temp => C:\Users\PRAMOD~1\AppData\Local\Temp
  // console.log(app.getPath("userData")); userData => C:\Users\Pramod Jacob Sam\AppData\Roaming\PDF-Toolkit
  // console.log(app.getPath("downloads")); downloads => C:\Users\Pramod Jacob Sam\Downloads

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("compress", (_, options) => {
    moveFilestoTemp(options, win);
  });

  ipcMain.on("merge", (_, options) => {
    moveFilestoTemp(options, win);
  });

  ipcMain.on("split", (_, options) => {
    moveFilestoTemp(options, win);
  });

  ipcMain.on("remove", (_, options) => {
    moveFilestoTemp(options, win);
  });

  ipcMain.on("pdfToJpg", (_, options) => {
    moveFilestoTemp(options, win);
  });

  ipcMain.on("JpgToPdf", (_, options) => {
    moveFilestoTemp(options, win);
  });
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  { role: "fileMenu" },
  // ...(isDev
  //   ? [
  //       {
  //         label: "Developer",
  //         submenu: [
  //           { role: "reload" },
  //           { role: "forcereload" },
  //           { role: "toggledevtools" },
  //         ],
  //       },
  //     ]
  //   : []),
  {
    label: "Developer",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
    ],
  },
];

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win == null) {
    createWindow();
  }
});
