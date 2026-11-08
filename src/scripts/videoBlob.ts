// Scroll-scrubbed videos need to seek to any time. The host (Cloudflare static assets) answers
// range requests with the whole file and a 200, so a plain `src` is not seekable there. Downloading
// the clip once and playing it from memory makes every frame reachable, and the HTTP cache keeps
// the download for the next page (e.g. after switching language).
const cache = new Map<string, Promise<string>>();

export function loadVideo(url: string): Promise<string> {
  let pending = cache.get(url);
  if (!pending) {
    pending = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${url}`);
        return res.blob();
      })
      .then((blob) => URL.createObjectURL(blob));
    // A failed download can be retried later instead of staying cached as an error.
    pending.catch(() => cache.delete(url));
    cache.set(url, pending);
  }
  return pending;
}

/** Plays `url` from memory; if the download fails, falls back to streaming it directly. */
export function attachVideo(el: HTMLVideoElement, url: string): void {
  loadVideo(url)
    .then((blobUrl) => {
      el.src = blobUrl;
    })
    .catch(() => {
      el.src = url;
    });
}
