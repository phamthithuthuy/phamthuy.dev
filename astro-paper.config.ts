import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://phamthuy.dev/",
    title: "Phạm Thủy",
    description:
      "Phạm Thị Thu Thủy — Business Analyst tại Hà Nội. Portfolio và BA notebook về phân tích nghiệp vụ, đặc tả yêu cầu, user story/use case và mô hình hoá quy trình (UML, BPMN).",
    author: "Phạm Thị Thu Thủy",
    ogImage: "default-og.jpg",
    lang: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/phamthithuthuy" },
    { name: "mail", url: "mailto:thuy@phamthuy.dev" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});