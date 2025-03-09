let Url_input = document.getElementById('Url');
let copy_input = document.getElementById('copy_input');
let copyurl_div = document.getElementById('copyurl_div');
let error_message = document.querySelector('#error_message');
let lastUrls = document.getElementById('lastUrls');
const logOutBtn = document.getElementById('logOutBtn');
const RecentDivId = document.getElementById('RecentDivId');

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
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('Createbtn').click();
  }
})

document.getElementById('logOutBtn').onclick = () => window.location.href = `${window.location.origin}/user/logout`;

document.addEventListener('DOMContentLoaded', () => {
  fetch("/api/get-urls")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('An unexpected error occurred.');
      }
    })
    .then((data) => {
      let domain = window.origin + '/';
      if (data) {
        RecentDivId.innerHTML = `<div class="text-gray-600 w-full max-w-md  mx-auto mt-10 flex justify-between items-center p-4 pl-0">
      <h2 class="text-lg">Recent Links</h2>
      <a class="hover:underline cursor-pointer">See All</a>
    </div>`;
      }
      data.forEach((url) => {
        RecentDivId.innerHTML += `
        <div class="bg-white mb-4 p-4 rounded-lg shadow-md border-l-4 border-yellow-400 flex flex-col w-full max-w-md mx-auto cursor-pointer">
  <div class="flex justify-between items-center">
    <a href="${url.redirectUrl}" target="_blank" class="text-gray-800 font-semibold capitalize hover:underline cursor-pointer"><span class="mr-0.5">🔗</span>${url.name}</a>
    <span class="text-gray-500 text-sm">${new Date(url.createdAt).toLocaleString()}</span>
  </div>
  <div class="flex justify-between items-center mt-2">
    <a href="${domain + url.shortId}" target="_blank" class="text-blue-500 text-sm hover:underline">
      ${(domain + url.shortId).length > 30 ? (domain + url.shortId).substring(0, 30) + "..." : domain + url.shortId}
    </a>
    <p class="flex items-unset">
      <img src="/click.svg" class="w-5 h-5 mr-1 text-lg"> <span>${url.visitHistory.length}</span>
    </p>
  </div>
</div>`
      });
    })
    .catch((error) => {
      console.error(error);
    });
})