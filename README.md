<div align="center">

# phamthuy.dev

### Personal site & business analysis notebook của **Phạm Thủy** — Business Analyst

Portfolio + sổ tay phân tích nghiệp vụ được build bằng [Astro](https://astro.build) (template [AstroPaper](https://github.com/satnaing/astro-paper)),
render sơ đồ [PlantUML](https://plantuml.com) (UML/BPMN) tại build-time, deploy lên **Cloudflare Workers** (Static Assets).

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

[**phamthuy.dev**](https://phamthuy.dev) · [Dự án](https://phamthuy.dev/projects) · [Bài viết](https://phamthuy.dev/posts) · [Giới thiệu](https://phamthuy.dev/about)

</div>

---

## Tính năng

- **Trang chủ dạng portfolio** — giới thiệu, danh sách dự án, bài viết mới nhất, link tải CV.
- **Sổ tay phân tích nghiệp vụ** — ghi chú BA (elicitation, user story, use case, SRS, mô hình hoá quy trình), import từ vault Obsidian.
- **PlantUML build-time** — fenced block ` ```plantuml ` được render thành SVG lúc build (cache theo hash), tiện dựng sơ đồ UML/BPMN, không cần runtime.
- **Tìm kiếm fuzzy** ([Pagefind](https://pagefind.app)), **dark/light mode**, **RSS**, **SEO**, **OG image động** (satori).
- Font **Be Vietnam Pro**, giao diện tiếng Việt (`lang: "vi"`).

## Tech stack

| Mảng | Công nghệ |
| --- | --- |
| Framework | Astro 6 · MDX · content collections |
| Style | Tailwind CSS v4 |
| Sơ đồ | PlantUML CLI (`plantuml.jar`, cần Java) → SVG |
| Tìm kiếm | Pagefind |
| Deploy | Cloudflare Workers + Static Assets (Wrangler) |
| Package manager | pnpm (qua corepack) |

## Cấu trúc thư mục

```
.
├── astro-paper.config.ts      # Cấu hình site (title, url, lang, socials…)
├── astro.config.ts            # Astro config: output static, i18n, remark plugins, fonts
├── plugins/
│   └── remark-plantuml.mjs    # Render ```plantuml → SVG lúc build (hash-cache)
├── scripts/
│   └── import-vault.mjs       # Importer one-off: vault Obsidian → src/content/posts
├── src/
│   ├── content/
│   │   ├── posts/             # Bài viết (ghi chú BA đã import)
│   │   ├── projects/          # Collection dự án (ShopFlow, phamthuy.dev)
│   │   └── pages/             # Trang tĩnh (about…)
│   ├── components/            # ProjectCard, Header, Footer…
│   ├── pages/                 # Routes (index portfolio, projects/…)
│   └── i18n/                  # Chuỗi ngôn ngữ (vi)
├── public/
│   └── diagrams/              # SVG PlantUML đã render (commit kèm, dùng làm cache)
└── wrangler.toml              # Cấu hình deploy Cloudflare
```

## Bắt đầu

**Yêu cầu:** Node `>=22.12`, [corepack](https://nodejs.org/api/corepack.html) (pnpm 10), và **Java** (chạy `plantuml.jar`).

```bash
# 1. Cài dependencies (dùng pnpm qua corepack, theo đúng lockfile)
corepack pnpm@10 install --frozen-lockfile

# 2. Tải PlantUML CLI về thư mục gốc (không commit trong repo)
wget -O plantuml.jar https://github.com/plantuml/plantuml/releases/latest/download/plantuml.jar

# 3. Chạy dev
npm run dev
```

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `astro check` → `astro build` (render PlantUML, OG, font…) → index Pagefind → copy index về `public/` |
| `npm run preview` | Xem thử bản build |
| `npm run deploy` | `npm run build` rồi `wrangler deploy` lên Cloudflare |
| `npm run lint` / `format` | ESLint / Prettier |

## PlantUML build-time

Plugin `plugins/remark-plantuml.mjs` quét các block ` ```plantuml `, gọi
`java -jar plantuml.jar -tsvg`, hash nội dung làm tên file và ghi SVG vào
`public/diagrams/<hash>.svg` — **đã có hash thì bỏ qua** (idempotent cache), rồi
thay block bằng `<figure class="diagram diagram-plantuml"><img …></figure>`.

- Đường dẫn jar lấy từ biến môi trường `PLANTUML_JAR`, mặc định `./plantuml.jar`.
- Phóng to ảnh qua `PLANTUML_SCALE` (mặc định `1.6`), giữ nguyên `viewBox` nên vẫn nét.
- Font chữ trong sơ đồ đặt qua `PLANTUML_FONT` (mặc định **Inter**) — font này phải được cài cho JVM/fontconfig lúc build để đo glyph đúng. Đổi font/scale sẽ tự render lại (giá trị được đưa vào hash cache).

## Import nội dung

`scripts/import-vault.mjs` là importer **một chiều, chạy một lần**: đọc (read-only)
vault BA handbook `second-brain/10-other/ba-handbook/`, transform frontmatter +
wikilink `[[...]]` → markdown link, đổi sang kebab-case, và ghi bản sao ra
`src/content/posts/`. File gốc trong vault không bị sửa. Chi tiết xem
[`MIGRATION.md`](MIGRATION.md).

## Deploy

Site build ra tĩnh (`output: "static"`) và phục vụ qua Cloudflare Workers Static
Assets. Cấu hình ở [`wrangler.toml`](wrangler.toml) (custom domain `phamthuy.dev`).

```bash
npm run deploy
```

## License

Mã nguồn template theo [MIT](LICENSE). Nội dung bài viết & dự án © Phạm Thủy.
