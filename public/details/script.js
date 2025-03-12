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
      dae =data.lastOpened;
      let resultHTML = `
      <div class="bg-white p-4 mt-4 rounded-lg shadow-md border-l-4 border-yellow-400 max-w-md mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-2">Shortened URL Details</h2>

    <p class="text-gray-700">
        <strong class="font-medium">Original URL:</strong>
        <a href="${data.url}" target="_blank" class="text-blue-500 hover:underline break-all">
            ${data.url}
        </a>
    </p>

    <p class="text-gray-700 mt-2">
        <strong class="font-medium">Total Clicks:</strong> ${data.lastOpened.length}
    </p>

    <p class="text-gray-700 mt-2 font-medium">Last Access Times:</p>
    <ul class="list-disc list-inside text-gray-600 mt-1">
        ${data.lastOpened.reverse().map((value) => 
            `<li class="text-sm">${new Date(value.timestamps).toLocaleString()} - ${value.ipaddress}</li>`
        ).join('')}
    </ul>
</div>

    `;

      document.querySelector('#p1').innerHTML = resultHTML;
    })
    .catch((error) => {
      error_message.innerHTML = error.message;
      error_message.classList.remove('hidden');
  
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

document.getElementById('logOutBtn').onclick = () =>	window.location.href=`${window.location.origin}/user/logout`;

document.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('url')) {
    Url_input.value = urlParams.get('url');
    getURL(getAlias());
  }

});