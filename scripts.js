// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const videos = document.querySelectorAll('.video');
  
  // 모든 비디오 미리 재생 (브라우저 정책에 따라 autoplay가 작동하도록)
  videos.forEach(video => {
    video.play().catch(() => {});
  });

  // 동영상 스크롤 감지 및 재생 제어
  container.addEventListener('scroll', () => {
    let currentVideoIndex = -1;
    videos.forEach((video, index) => {
      const rect = video.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        currentVideoIndex = index;
        video.play();
      } else {
        video.pause();
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

  // 동영상 종료 시 다음 동영상으로 스크롤
  videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
      const nextVideo = videos[index + 1];
      if (nextVideo) {
        nextVideo.closest('.video-container').scrollIntoView({ behavior: 'smooth' });
        nextVideo.play();
      }
    });
  });
});
