#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh CV chuẩn Harvard cho Phạm Thị Thu Thủy (Business Analyst), thân thiện ATS.

Usage:
  python3 scripts/build_cv.py
  # → public/cv_phamthuy.docx (+ .pdf nếu có LibreOffice)
"""
from pathlib import Path

from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

ROOT = Path(__file__).resolve().parent.parent
# DOCX outside public/ — Astro/Vite would try to parse binary assets in public/
OUT_DOCX = ROOT / "scripts" / "cv_phamthuy.docx"
OUT_PDF = ROOT / "public" / "cv_phamthuy.pdf"
OUT_PDF_DIR = OUT_PDF.parent

FONT = "Times New Roman"
USABLE_W = Cm(18.0)  # A4 21cm - lề trái 1.5 - lề phải 1.5

doc = Document()

# ---- Lề trang ----
sec = doc.sections[0]
sec.page_height = Cm(29.7)
sec.page_width = Cm(21.0)
sec.top_margin = Cm(1.2)
sec.bottom_margin = Cm(1.2)
sec.left_margin = Cm(1.5)
sec.right_margin = Cm(1.5)

# ---- Style mặc định ----
normal = doc.styles["Normal"]
normal.font.name = FONT
normal.font.size = Pt(10.5)
normal.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
pf = normal.paragraph_format
pf.space_before = Pt(0)
pf.space_after = Pt(0)
pf.line_spacing = 1.0


def add_para(space_after=0, space_before=0, align=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    if align is not None:
        p.alignment = align
    return p


def run(p, text, *, bold=False, italic=False, size=10.5, color=None, caps=False):
    r = p.add_run(text)
    r.bold = bold
    r.italic = italic
    r.font.name = FONT
    r.font.size = Pt(size)
    r.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    if color:
        r.font.color.rgb = RGBColor(*color)
    if caps:
        r.font.all_caps = True
    return r


def bottom_border(p, sz=8, color="000000"):
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(sz))
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), color)
    pBdr.append(bottom)
    pPr.append(pBdr)


def heading(text):
    p = add_para(space_before=5, space_after=3)
    run(p, text.upper(), bold=True, size=11)
    p.paragraph_format.tab_stops.clear_all()
    bottom_border(p)


def entry(left, right, *, left_bold=True, italic=False, size=10.5):
    """Một dòng: nội dung trái + (tab phải) ngày/thông tin bên phải."""
    p = add_para(space_before=3 if left_bold else 0, space_after=0)
    p.paragraph_format.tab_stops.add_tab_stop(USABLE_W, WD_TAB_ALIGNMENT.RIGHT)
    run(p, left, bold=left_bold, italic=italic, size=size)
    if right:
        p.add_run("\t")
        run(p, right, italic=True, size=size)
    return p


def bullet(segments, space_after=0):
    """segments: list các (text, {bold/italic}) hoặc str."""
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent = Cm(0.55)
    p.paragraph_format.first_line_indent = Cm(-0.3)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.0
    for seg in segments:
        if isinstance(seg, str):
            run(p, seg)
        else:
            txt, opt = seg
            run(p, txt, bold=opt.get("bold", False), italic=opt.get("italic", False))
    return p


def skill_line(label, value):
    p = add_para(space_after=1)
    run(p, label + ": ", bold=True)
    run(p, value)
    return p


B = lambda t: (t, {"bold": True})
I = lambda t: (t, {"italic": True})

# ===================== HEADER =====================
p = add_para(space_after=1, align=WD_ALIGN_PARAGRAPH.CENTER)
run(p, "PHẠM THỊ THU THỦY", bold=True, size=18)

p = add_para(space_after=1, align=WD_ALIGN_PARAGRAPH.CENTER)
run(p, "Business Analyst", italic=True, size=10.5, color=(0x33, 0x33, 0x33))

p = add_para(space_after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
run(
    p,
    "Hà Nội, Việt Nam  |  0355 021 275  |  thuy@phamthuy.dev  |  "
    "github.com/phamthithuthuy  |  phamthuy.dev",
    size=10,
)

# ===================== TÓM TẮT =====================
heading("Tóm tắt")
p = add_para(space_after=2)
run(p, "Sinh viên CNTT năm cuối, định hướng ")
run(p, "Business Analyst", bold=True)
run(
    p,
    ", tập trung vào phân tích nghiệp vụ, đặc tả yêu cầu và mô hình hoá quy trình. Có kinh "
    "nghiệm làm BA trong nhóm xây dựng hệ thống bán hàng & quản lý kho end-to-end theo "
    "Agile/Scrum (dự án học tập từ case study): phân tích nghiệp vụ, viết user story/use "
    "case và bàn giao tài liệu cho đội phát triển. Tư duy hệ thống, cẩn thận với chi tiết — "
    "luôn hỏi tại sao một yêu cầu tồn tại, ai là người dùng cuối, và tradeoff nghiệp vụ là gì.",
)

# ===================== HỌC VẤN =====================
heading("Học vấn")
entry("Đại học · Chuyên ngành Công nghệ Thông tin", "Năm cuối · Dự kiến tốt nghiệp 2027")
entry(
    "Kỹ sư Công nghệ Thông tin — Hà Nội, Việt Nam",
    "GPA: 3.6 / 4.0",
    left_bold=False,
    italic=True,
)
bullet(
    [
        B("Sinh viên Xuất sắc & Sinh viên Giỏi"),
        " trong 2 kỳ học gần nhất; nhận học bổng khuyến khích học tập.",
    ]
)
bullet(
    [
        "Môn học liên quan: Phân tích & Thiết kế hệ thống, Cơ sở dữ liệu, Cấu trúc dữ liệu & "
        "Giải thuật, Lập trình hướng đối tượng, Lập trình web, Hệ điều hành, Mạng máy tính, "
        "Quản lý dự án phần mềm."
    ],
    space_after=2,
)

# ===================== DỰ ÁN =====================
heading("Dự án")

entry(
    "ShopFlow — Hệ thống Bán hàng & Quản lý kho (github.com/hoangtuan2k5/shopflow)",
    "05/2026 – 06/2026",
)
entry(
    "Business Analyst (nhóm 3 người · dự án học tập từ case study)",
    "Jira · Agile/Scrum · UML · BPMN · SQL",
    left_bold=False,
    italic=True,
)
bullet(
    [
        "Phân tích case study bán hàng & quản lý kho; xác định 3 nhóm tác nhân (chủ shop, "
        "nhân viên kho, khách hàng) và chuyển hoá thành ",
        B("user story"),
        " kèm tiêu chí "
        "chấp nhận (acceptance criteria) cho từng sprint.",
    ]
)
bullet(
    [
        "Viết tài liệu đặc tả yêu cầu (",
        B("SRS"),
        ") và ",
        B("use case"),
        " cho các luồng: "
        "danh mục sản phẩm, tạo đơn, mô phỏng thanh toán, quản lý tồn kho, nhập hàng, hoàn "
        "hàng và cảnh báo sắp hết hàng.",
    ]
)
bullet(
    [
        "Mô hình hoá nghiệp vụ bằng ",
        B("activity diagram, sequence diagram"),
        " và ",
        B("state machine"),
        " cho vòng đời đơn hàng; đặc tả hai trạng thái độc lập cho thanh "
        "toán và giao hàng để bộ phận phát triển bám sát.",
    ]
)
bullet(
    [
        "Phối hợp thiết kế CSDL với đội backend: rà soát ",
        I("ERD"),
        " 12 bảng, xác định quy "
        "tắc nghiệp vụ tồn kho 3 chỉ số (available = on_hand − reserved) và yêu cầu lưu vết "
        "lịch sử hoá đơn (snapshot).",
    ]
)
bullet(
    [
        "Quản lý ",
        B("product backlog trên Jira"),
        "; tham gia sprint planning, refinement và "
        "review; nghiệm thu tính năng theo acceptance criteria để đảm bảo MVP đúng phạm vi.",
    ]
)
bullet(
    [
        "Soạn user manual & checklist nghiệm thu cuối dự án; làm cầu nối giữa yêu cầu nghiệp "
        "vụ và đội Frontend/Backend trong suốt 3 sprint."
    ],
    space_after=3,
)

entry("phamthuy.dev — Business Analysis Notebook & Personal Site", "06/2026 – nay")
entry("Tác giả", "Documentation · UML · BPMN", left_bold=False, italic=True)
bullet(
    [
        "Hệ thống hoá kiến thức BA dạng notebook: kỹ thuật elicitation, viết ",
        B("user story / use case / SRS"),
        ", mô hình hoá quy trình (BPMN/UML), và phân tích dữ liệu cơ bản.",
    ]
)
bullet(
    [
        "Xây dựng personal site giới thiệu portfolio các case study phân tích nghiệp vụ và "
        "tài liệu dự án."
    ],
    space_after=2,
)

# ===================== KỸ NĂNG =====================
heading("Kỹ năng")
skill_line(
    "Phân tích nghiệp vụ",
    "Elicitation · User Story · Use Case · SRS/BRD · Acceptance Criteria · UAT",
)
skill_line("Mô hình hoá", "UML (Use Case, Activity, Sequence, State) · BPMN · ERD · Wireframe")
skill_line("Công cụ", "Jira · Confluence · Figma · Draw.io · Postman · Microsoft Office")
skill_line("Dữ liệu & Kỹ thuật", "SQL · PostgreSQL · REST API (đọc hiểu) · OpenAPI")
skill_line(
    "Phương pháp & Kỹ năng mềm",
    "Agile/Scrum · Quản lý backlog · Giao tiếp · Làm việc nhóm · Tư duy phản biện",
)

# ===================== HOẠT ĐỘNG & ĐỊNH HƯỚNG =====================
heading("Hoạt động & Định hướng")
bullet(
    [
        "Đang đào sâu nghiệp vụ phân tích (BABOK), kỹ thuật viết tài liệu và mô hình hoá quy trình."
    ]
)
bullet(
    ["Nâng cao tiếng Anh kỹ thuật để đọc tài liệu và giao tiếp trong môi trường phần mềm."]
)

OUT_DOCX.parent.mkdir(parents=True, exist_ok=True)
OUT_PDF_DIR.mkdir(parents=True, exist_ok=True)
doc.save(OUT_DOCX)
print(f"Saved {OUT_DOCX}")

# Optional: LibreOffice → PDF (site serves only the PDF from public/)
import shutil
import subprocess

soffice = shutil.which("libreoffice") or shutil.which("soffice")
if soffice:
    subprocess.run(
        [
            soffice,
            "--headless",
            "--convert-to",
            "pdf",
            "--outdir",
            str(OUT_PDF_DIR),
            str(OUT_DOCX),
        ],
        check=True,
    )
    print(f"Saved {OUT_PDF}")
else:
    print("LibreOffice not found — skipped PDF export (docx only).")
