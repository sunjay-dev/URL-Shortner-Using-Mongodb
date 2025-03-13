const urlDiv = document.getElementById('urlDiv');
const domain = window.origin + '/';

document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/userUrls')
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('An unexpected error occurred.');
            }
        })
        .then((data) => {
            urlDiv.innerHTML = '';

            data.forEach((url) => {
                urlDiv.innerHTML += `
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

urlDiv.addEventListener("click", (event) =>{
    let clickedCard = event.target.closest(".bg-white"); 
    if (!clickedCard) return;
  
    let urlElement = clickedCard.querySelector(".text-blue-500");
    if (!urlElement) return;
  
    let url = urlElement.getAttribute("href");
    if (!url) return;
  
    window.location.href = `/details/?url=${url}`;
  });