# BA handbook → blog import

How the BA handbook vault maps into AstroPaper's `posts` collection, via
`scripts/import-vault.mjs`.

- **Source:** `ba-handbook/notes/`
- **Output:** `src/content/posts/` (URL prefix `/posts`)
- **Run:** `node scripts/import-vault.mjs` (dry run) · `--write` (perform import)

> **Trạng thái hiện tại:** handbook có 3 note nội dung trong `00-foundations/`.
> Các file khung (`README.md`, `_conventions.md`, `note-guidelines.md` và
> `glossary.md`) không được import thành bài viết.

---

## 1. Bài viết vs. file bị loại

| Vault path (dưới `notes/`) | Vào import? |
|---|---|
| `<NN-folder>/<note>.md` (note nội dung) | ✅ → `posts/<topic>/<slug>` |
| mọi `README.md` | ❌ bỏ (mục lục thư mục) |
| file bắt đầu bằng `_` (ví dụ `_conventions.md`, `_planed.md`) | ❌ bỏ (tài liệu nội bộ) |
| `note-guidelines.md`, `glossary.md` | ❌ bỏ (tài liệu khung) |

## 2. Frontmatter sinh tự động

Note trong vault không có YAML — mở đầu bằng `# Title`, thường kèm callout `>`,
rồi nội dung tiếng Việt. Script sinh header:

```yaml
---
title: "<H1 đầu tiên, đã bỏ '# '>"
pubDatetime: <ngày commit đầu của file, hoặc hôm nay nếu không có git>
description: "<đoạn văn đầu tiên, cắt ~160 ký tự>"
tags: ["ba", "<topic-từ-thư-mục>"]   # vd: discovery-and-requirements
draft: false
---
```

- **Bỏ H1** khỏi body sau khi đưa lên `title` (AstroPaper render title từ frontmatter).
- `pubDatetime` ưu tiên ngày git; không có thì fallback ngày hiện tại.

## 3. Biến đổi nội dung

- **`[[wikilinks]]`** → link Markdown tới slug đã import (resolve theo basename);
  link không khớp bị rút về plain text và log lại.
- **PlantUML** — block ` ```plantuml ` render qua plugin build-time (UML/BPMN).
- **Callouts** (`> [!note]`) — `rehype-callouts` render nguyên dạng, không cần sửa.

## 4. Slug & taxonomy

- **Slug**: từ path, kebab-case, bỏ tiền tố số `NN-`. Vd
  `01-discovery-and-requirements/requirement-elicitation.md`
  → `/posts/discovery-and-requirements/requirement-elicitation`.
- **Tags**: `ba` + topic theo thư mục cấp 1 — `foundations`,
  `discovery-and-requirements`, `system-analysis-and-design`, `specification`,
  `agile-delivery`, `domain-knowledge`, `soft-skills`, `tools`, `templates`.
