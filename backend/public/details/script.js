let Url_input = document.getElementById('Url');
let error_message = document.querySelector('#error_message');
var dae;
function getURL(Alias) {
  fetch(`/api/details?url=${Alias}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((error) => {
          throw new Error(error.error || "An unexpected error occurred.");
        });
      }
    })
    .then((data) => {
      if (!data || !data.lastOpened) {
          document.querySelector('#p1').innerHTML = "<p class='text-red-500'>No visit history found.</p>";
          return;
      }
  
      let resultHTML = `
      <div class="bg-white p-4 mt-4 rounded-lg shadow-md border-l-4 border-yellow-400 max-w-full overflow-x-auto mx-auto">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Shortened URL Details</h2>
  
          <p class="text-gray-700">
              <strong class="font-medium">Original URL:</strong>
              <a href="${data.url}" target="_blank" class="text-blue-500 hover:underline break-all">
                  ${data.url ?? "N/A"}
              </a>
          </p>
  
          <p class="text-gray-700 mt-2">
              <strong class="font-medium">Total Clicks:</strong> ${data.lastOpened.length ?? 0}
          </p>        
      </div>
      <p class="text-gray-700 text-lg mt-6 font-medium">Last Access Times:</p>
      <div class="overflow-x-auto my-2 bg-white">
              <table class="min-w-full border-collapse border  border-gray-300 text-sm">
                  <thead>
                      <tr class="bg-gray-100">
                          <th class="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">IP Address</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">Browser</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">OS</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">Device</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">Country</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">City</th>
                          <th class="border border-gray-300 px-4 py-2 text-left">Region</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${data.lastOpened.slice().reverse().map((value) => 
                          `<tr class="border-b">
                              <td class="border border-gray-300 px-4 py-2">${new Date(value.timestamps).toLocaleString() ?? "N/A"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.ipaddress ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.browser ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.os ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.device ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.country ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.city ?? "Unknown"}</td>
                              <td class="border border-gray-300 px-4 py-2">${value.region ?? "Unknown"}</td>
                          </tr>`
                      ).join('')}
                  </tbody>
              </table>
          </div>
      `;
  
      document.querySelector('#p1').innerHTML = resultHTML;
  })
  .catch((error) => {
      const errorMessage = document.querySelector('#error_message');
      errorMessage.innerHTML = `Error: ${error.message}`;
      errorMessage.classList.remove('hidden');
  });
  
}

function getAlias(){
  let part=1;
  let url = Url_input.value;
  if(url.endsWith('/')) part=2;

  let array = url.split('/');
  return array[array.length-part]
}

Url_input.addEventListener('keypress', (e)=>{
  if(e.key==="Enter"){
    e.preventDefault()
    document.getElementById('detailsbtn').click();
  }
})

Url_input.addEventListener('input', () => {
  error_message.classList.add('hidden');
})

document.getElementById('detailsbtn').onclick = () => {
  if (Url_input.value === "") {
    error_message.innerHTML = "Please Enter Url...";
    error_message.classList.remove('hidden');

  }
  else
    getURL(getAlias())
}

document.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('url')) {
    Url_input.value = urlParams.get('url');
    getURL(getAlias());
  }

});