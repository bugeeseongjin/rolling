// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const videos = document.querySelectorAll('.video');
  let currentVideo = null;

  // 동영상 클릭 시 재생 제어
  videos.forEach((video, index) => {
    video.addEventListener('click', () => {
      // 현재 재생 중인 동영상 정지
      if (currentVideo && currentVideo !== video) {
        currentVideo.pause();
        currentVideo.currentTime = 0; // 처음부터 재생
      }

      // 클릭한 동영상 재생
      if (video.paused) {
        video.play();
        currentVideo = video;
      } else {
        video.pause();
      }
    });

    // 동영상 종료 시 다음 동영상으로 스크롤
    video.addEventListener('ended', () => {
      const nextVideo = videos[index + 1];
      if (nextVideo) {
        nextVideo.closest('.video-container').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 스크롤 제어
  container.addEventListener('scroll', () => {
    let currentVideoIndex = -1;
    videos.forEach((video, index) => {
      const rect = video.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        currentVideoIndex = index;
      }
    });

    // 스크롤 제어
    if (currentVideoIndex === 0) {
      // 첫 번째 동영상에서 위로 스크롤 막기
      if (container.scrollTop < 1) {
        container.scrollTop = 1;
      }
    } else if (currentVideoIndex === videos.length - 1) {
      // 마지막 동영상에서 아래로 스크롤 막기
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (container.scrollTop > maxScrollTop - 1) {
        container.scrollTop = maxScrollTop - 1;
      }
    }
  });
});
