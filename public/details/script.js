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
      <div class="card p-3">
        <h5>Shortened URL Details</h5>
        <p><strong>Original URL:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
        <p><strong>Total Clicks:</strong> ${data.clicks}</p>
        <p><strong>Last Access Times:</strong></p>
        <ul>
          ${data.lastOpened.reverse().map((time) => `<li>${new Date(time.timestamps).toLocaleString()}</li>`).join('')}
        </ul>
      </div>
    `;

      document.querySelector('#p1').innerHTML = resultHTML;
    })
    .catch((error) => {
      error_message.innerHTML = error.message;
      error_message.style.display = "block";
      Url_input.classList.add('error');
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
  error_message.style.display = "none";
  Url_input.classList.remove('error');
})

document.getElementById('detailsbtn').onclick = () => {
  if (Url_input.value === "") {
    error_message.innerHTML = "Please Enter Url...";
    error_message.style.display = "block";
    Url_input.classList.add('error');
  }
  else
    getURL(getAlias())
}

document.getElementById('logOutBtn').onclick = () =>	window.location.href=`${window.location.origin}/user/logout`;