let Url_input = document.getElementById('Url');
let Alias = document.getElementById('Alias');
let copy_input = document.getElementById('copy_input');
let copyurl_div = document.getElementById('copyurl_div');
let error_message = document.querySelector('#error_message');
let lastUrls = document.getElementById('lastUrls');

function getURL() {

  fetch("/custom", {
    method: "POST",
    body: JSON.stringify({ 
      url: Url_input.value,
      custom: Alias.value
     }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error('Invalid Url...');
      } else if (res.status === 409) {
        throw new Error('Url already taken...');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    })
    .then((data) => {
      copyurl_div.classList.remove('d-none');
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
  else if(Alias.value === ""){
    error_message.innerHTML = "Please Enter Alias...";
    error_message.style.display = "block";
    Url_input.classList.add('error');
  }
  else if (!validator.isURL(Url_input.value)) {
    error_message.innerHTML = "Invalid Url...";
    error_message.style.display = "block";
    Url_input.classList.add('error');
    copyurl_div.classList.add('d-none');
  }
  else
    getURL()
}

Url_input.addEventListener('input', () => {
  error_message.style.display = "none";
  Url_input.classList.remove('error');
})

Alias.addEventListener('input', () => {
  error_message.style.display = "none";
  Url_input.classList.remove('error');
})

Url_input.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    document.getElementById('Createbtn').click();
  }
})

Alias.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    document.getElementById('Createbtn').click();
  }
})

document.getElementById('logOutBtn').onclick = () =>	window.location.href=`${window.location.origin}/user/logout`;
