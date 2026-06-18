import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Trang chủ",
    posts: "Bài viết",
    projects: "Dự án",
    tags: "Thẻ",
    about: "Giới thiệu",
    archives: "Lưu trữ",
    search: "Tìm kiếm",
  },
  post: {
    publishedAt: "Đăng lúc",
    updatedAt: "Cập nhật",
    sharePostIntro: "Chia sẻ bài viết:",
    sharePostOn: "Chia sẻ bài viết lên {{platform}}",
    sharePostViaEmail: "Chia sẻ bài viết qua email",
    tagLabel: "Thẻ",
    backToTop: "Lên đầu trang",
    goBack: "Quay lại",
    editPage: "Sửa trang",
    previousPost: "Bài trước",
    nextPost: "Bài sau",
  },
  pagination: {
    prev: "Trước",
    next: "Sau",
    page: "Trang",
  },
  home: {
    socialLinks: "Liên kết mạng xã hội",
    featured: "Nổi bật",
    recentPosts: "Bài viết gần đây",
    allPosts: "Tất cả bài viết",
  },
  footer: {
    copyright: "Phạm Thủy",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    tagTitle: "Thẻ",
    tagDesc: "Tất cả bài viết có thẻ",

    tagsTitle: "Thẻ",
    tagsDesc: "Tất cả thẻ được dùng trong bài viết.",

    postsTitle: "Bài viết",
    postsDesc: "Tất cả bài viết tôi đã đăng.",

    projectsTitle: "Dự án",
    projectsDesc: "Những thứ tôi đã xây dựng.",

    archivesTitle: "Lưu trữ",
    archivesDesc: "Tất cả bài viết tôi đã lưu trữ.",

    searchTitle: "Tìm kiếm",
    searchDesc: "Tìm kiếm bài viết ...",
  },
  a11y: {
    skipToContent: "Bỏ qua tới nội dung",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    toggleTheme: "Đổi giao diện sáng/tối",
    searchPlaceholder: "Tìm bài viết...",
    noResults: "Không tìm thấy kết quả",
    goToPreviousPage: "Tới trang trước",
    goToNextPage: "Tới trang sau",
  },
  notFound: {
    title: "404 Không tìm thấy",
    message: "Không tìm thấy trang",
    goHome: "Về trang chủ",
  },
} satisfies UIStrings;
