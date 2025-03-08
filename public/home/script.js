let Url_input = document.getElementById('Url');
let copy_input = document.getElementById('copy_input');
let copyurl_div = document.getElementById('copyurl_div');
let error_message = document.querySelector('#error_message');
let lastUrls = document.getElementById('lastUrls');
const logOutBtn = document.getElementById('logOutBtn');

function getURL() {

  fetch("/", {
    method: "POST",
    body: JSON.stringify({ url: Url_input.value }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error('Invalid Url...');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    })
    .then((data) => {
      copyurl_div.classList.remove('hidden');
      copyurl_div.classList.add('flex');
      copy_input.value = window.origin + '/' + data.new;
    })
    .catch((error) => {
      error_message.innerHTML = error.message;
      error_message.style.display = "block";
      Url_input.classList.add('error');
    });
}

document.getElementById('copyButton').addEventListener('click', function () {
  navigator.clipboard.writeText(copy_input.value)
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
});

document.getElementById('Createbtn').onclick = () => {
  if (Url_input.value === "") {
    error_message.innerHTML = "Please Enter Url...";
    error_message.style.display = "block";
    Url_input.classList.add('error');
  }
  else if (!validator.isURL(Url_input.value)) {
    error_message.innerHTML = "Invalid Url...";
    error_message.style.display = "block";
    Url_input.classList.add('error');
    copyurl_div.classList.add('hidden');
    copyurl_div.classList.remove('flex');
  }
  else
    getURL()
}

Url_input.addEventListener('input', () => {
  error_message.style.display = "none";
  Url_input.classList.remove('error');
})

Url_input.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    document.getElementById('Createbtn').click();
  }
})

document.getElementById('logOutBtn').onclick = () =>	window.location.href=`${window.location.origin}/user/logout`;