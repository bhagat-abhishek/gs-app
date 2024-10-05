// get formarea and loading area
const formArea = document.getElementById("formArea");
const loadingArea = document.getElementById("loadingArea");
const jsonArea = document.getElementById("jsonArea");

// document area
const jsonData = document.getElementById("jsonData");

document
  .getElementById("urlForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const urlInput = document.getElementById("urlInput").value;

    if (!urlInput) {
      return;
    }

    formArea.style.display = "none";
    loadingArea.style.display = "block";

    try {
        ipcRenderer.send('fetchData', { urlInput });
      
        ipcRenderer.on('fetchDataResponse', (event, data) => {
          loadingArea.style.display = 'none';
          jsonArea.style.display = 'block';
      
          jsonData.innerHTML = data;
        });
      
        ipcRenderer.on('fetchDataError', (event, errorMessage) => {
          loadingArea.style.display = 'none';
          loadingArea.innerText = errorMessage;
          loadingArea.style.display = 'block';
        });
      } catch (error) {
        loadingArea.style.display = 'none';
        loadingArea.innerText = 'Something went wrong, please try again later', error.message;
        loadingArea.style.display = 'block';
        // console.error("Error:", error.message);
      }
  });

// Copyable on click
document.getElementById("copyButton").addEventListener("click", function () {
  const range = document.createRange();
  range.selectNode(jsonData);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("JSON copied to clipboard!");
});
