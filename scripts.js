// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video');

  videos.forEach((video, index) => {
    if (index === 0) {
      video.play();
    }

    video.addEventListener('ended', () => {
      const nextVideo = videos[index + 1];
      if (nextVideo) {
        nextVideo.closest('.video-container').scrollIntoView({ behavior: 'smooth' });
        nextVideo.play();
      }
    });
  });

  document.getElementById('container').addEventListener('scroll', () => {
    videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
});
