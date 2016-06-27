function downloadFile(url) {
  try {
    var elemIF = document.createElement("iframe");
    elemIF.src = url;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  } catch (e) {
    console.log("出错：DownloadFile.jsx 下载出错！");
  }
}
export default downloadFile;
