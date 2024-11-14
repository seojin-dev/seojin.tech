// 스킬 설명 데이터
const skillDescriptions = {
  python:
    "Python은 제가 처음 배운 프로그래밍 언어입니다. 학교 수업에서 처음 접하게 되었고, 간단한 문법과 풍부한 라이브러리 덕분에 빠르게 실력을 향상시킬 수 있었습니다.",
  java: "Java를 통해 객체지향 프로그래밍의 개념을 배웠습니다. 안드로이드 앱 개발에 관심이 생겨 배우기 시작했습니다.",
  c: "C언어는 컴퓨터의 작동 원리를 이해하고 싶어서 배우게 되었습니다. 메모리 관리와 포인터 개념을 배우며 프로그래밍의 기초를 다졌습니다.",
  html: "웹 개발에 흥미를 느껴 HTML/CSS를 배우기 시작했습니다. 이 포트폴리오 사이트도 직접 만들었습니다!",
  react:
    "더 동적인 웹사이트를 만들고 싶어서 React를 배우게 되었습니다. 컴포넌트 기반 개발의 매력에 푹 빠졌습니다.",
  javascript:
    "웹 개발을 하면서 자연스럽게 JavaScript를 배우게 되었습니다. 동적인 기능 구현에 재미를 느끼고 있습니다.",
  arduino:
    "하드웨어에 대한 호기심으로 Arduino를 시작했습니다. LED 제어부터 센서 활용까지 다양한 프로젝트를 진행하고 있습니다.",
};

// 스킬 클릭 이벤트
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("click", function () {
    const skill = this.dataset.skill;
    const descriptionElement = document.getElementById("skill-description");
    descriptionElement.style.display = "block";
    descriptionElement.innerHTML = skillDescriptions[skill];

    // 모든 스킬 아이템 스타일 초기화
    document.querySelectorAll(".skill-item").forEach((i) => {
      i.style.background = "#f8f9fa";
      i.style.color = "#333";
    });

    // 클릭된 스킬 아이템 스타일 변경
    this.style.background = "#4158D0";
    this.style.color = "white";
  });
});

// GitHub 프로젝트 로드
async function loadProjects() {
  try {
    const response = await fetch(
      "https://api.github.com/users/seojin-dev/repos"
    );
    const projects = await response.json();
    const projectsContainer = document.getElementById("projects-container");

    projects.slice(0, 6).forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.className = "project-card";
      projectElement.innerHTML = `
                <a href="${
                  project.html_url
                }" target="_blank" style="text-decoration: none; color: inherit;">
                    <h3>${project.name}</h3>
                    <p>${project.description || "프로젝트 설명이 없습니다."}</p>
                    <p>⭐ ${project.stargazers_count} | 👀 ${
        project.watchers_count
      }</p>
                </a>
            `;
      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error("프로젝트를 불러오는 중 오류가 발생했습니다:", error);
  }
}

// Dev.to 블로그 포스트 로드
async function loadBlogPosts() {
  try {
    const username = "seojindev"; // dev.to 사용자명으로 변경하세요
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}`
    );
    const posts = await response.json();
    const blogContainer = document.getElementById("blog");

    // 기존 블로그 섹션의 내용을 지우고 새로운 내용 추가
    blogContainer.innerHTML = "<h2>📝 Blog</h2>";

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "blog-post";
      postElement.innerHTML = `
                <div class="blog-date">${new Date(
                  post.published_at
                ).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-preview">${post.description || post.title}</p>
                <div class="blog-tags">
                   
                </div>
                <a href="${
                  post.url
                }" class="read-more" target="_blank">더 읽기 →</a>
            `;
      blogContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Dev.to 포스트를 불러오는데 실패했습니다:", error);
    const blogContainer = document.getElementById("blog");
    blogContainer.innerHTML =
      "<h2>📝 Blog</h2><p>블로그 포스트를 불러올 수 없습니다.</p>";
  }
}

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 페이지 로드 시 실행
window.addEventListener("load", () => {
  loadProjects();
  loadBlogPosts();
});
