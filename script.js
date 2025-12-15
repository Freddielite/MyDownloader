const input = document.getElementById("linkInput");
const platformSelect = document.getElementById("platform");
const button = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

button.addEventListener("click", async () => {
  const url = input.value;
  const platform = platformSelect.value;

  if (!url) {
    statusText.innerText = "Please paste a link.";
    return;
  }

  statusText.innerText = "Fetching download link...";

  const apiRoutes = {
    apple: `https://delirius-apiofc.vercel.app/download/applemusicdl?url=${encodeURIComponent(url)}`,
    instagram: `https://delirius-apiofc.vercel.app/download/instagram?url=${encodeURIComponent(url)}`,
    pinterest: `https://delirius-apiofc.vercel.app/download/pinterestdl?url=${encodeURIComponent(url)}`,
    spotify: `https://delirius-apiofc.vercel.app/download/spotifydl?url=${encodeURIComponent(url)}`,
    threads: `https://delirius-apiofc.vercel.app/download/threads?url=${encodeURIComponent(url)}`,
    tiktok: `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(url)}`,
    twitter: `https://delirius-apiofc.vercel.app/download/twitterdl?url=${encodeURIComponent(url)}`,
    ytmp3: `https://kyyokatsurestapi.my.id/downloader/ytmp3?url=${encodeURIComponent(url)}`,
    ytmp4: `https://kyyokatsurestapi.my.id/downloader/ytmp4?url=${encodeURIComponent(url)}`
  };

  try {
    const response = await fetch(apiRoutes[platform]);
    const data = await response.json();

    // Many of these APIs return different structures
    // This handles the common case
    const downloadUrl =
      data.download ||
      data.result?.download ||
      data.data?.url;

    if (downloadUrl) {
      statusText.innerText = "Starting download...";
      window.location.href = downloadUrl;
    } else {
      statusText.innerText = "Could not find download link.";
    }
  } catch (err) {
    statusText.innerText = "API error. Try again later.";
  }
});
