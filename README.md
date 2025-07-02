# 🧠 GPT-ConvO-Exporter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![GitHub stars](https://img.shields.io/github/stars/seif4d/GPT-ConvO-Exporter.svg?style=social)](https://github.com/seif4d/GPT-ConvO-Exporter/stargazers)

🚀 Effortlessly export your **ChatGPT** conversations into beautifully formatted Markdown files — perfect for your Personal Knowledge Management (PKM) system like **Obsidian**, **Logseq**, or any Markdown app.

---

## 📑 Table of Contents

1. [✨ Features](#-features)  
2. [🛠️ Usage](#️-usage)  
3. [🗂️ Scripts](#️-scripts)  
4. [📸 Examples](#-examples)  
5. [⚖️ License](#️-license)  
6. [💌 Credits](#-credits)  
7. [🌐 بالعربي](#-بالعربي)

---

## ✨ Features

- ✅ **Multiple export styles** to match your workflow:  
  - 🔥 **Logseq Outliner**: Nested blocks for folding & outlining.  
  - 💎 **Obsidian Callouts**: `[!QUESTION]`, `[!TIP]` visual panels.  
  - ✍️ **Obsidian Simple**: Clean headings & blockquotes.  
  - 📜 **Generic Markdown**: Plain Markdown for any editor.

- ✅ **Automatic YAML Frontmatter**:  
  ``` yaml
  title: "Your ChatGPT Conversation Title"
  tags: [chatgpt-export, logseq, obsidian]
  date: 2025-07-02T12:34:56Z
  ---
  ``

* ✅ **Full formatting support**:

  * Code blocks (with language detection)
  * Lists, blockquotes, bold/italic, horizontal rules
  * Multi-language content (Arabic 🇪🇬, English 🇬🇧, etc.)

---

## 🛠️ Usage

1. **Open** the ChatGPT conversation page you want to export.
2. **Open** your browser’s console (F12 or Ctrl+Shift+I → Console).
3. **Copy & Paste** the content of one of the `.js` scripts below.
4. **Press Enter** → your `.md` file downloads instantly! 🎉

---

## 🗂️ Scripts

| Script File                                                    | Description                                  | Perfect for                                |
| -------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| [`logseq-export.js`](./logseq-export.js)                       | Outliner-format with nested bullets          | Logseq users                               |
| [`obsidian-callouts-export.js`](./obsidian-callouts-export.js) | Callouts with `[!QUESTION]`, `[!TIP]` panels | Obsidian visual Lovers                     |
| [`obsidian-simple-export.js`](./obsidian-simple-export.js)     | Clean Markdown with headings & blockquotes   | Obsidian minimalists                       |
| [`markdown-generic-export.js`](./markdown-generic-export.js)   | Standard Markdown with separators            | Any Markdown editor (Notion, VSCode, etc.) |

---

## 📸 Examples

### Obsidian Callouts

```markdown
> [!QUESTION] 🧑‍💻 Your question  
What’s the best way to organize PKM notes?

> [!TIP] 🤖 GPT’s reply  
You can use tools like Obsidian or Logseq to interlink your notes and review them periodically.
```

<kbd><img src="https://i.imgur.com/k2j1C8C.png" width="400" /></kbd>

---

## ⚖️ License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for details. ❤️

---

## 💌 Credits

Built by **[seif4d](https://github.com/seif4d)** 🥷🏻 with the help of his AI companion.
If you find this useful, please ⭐ the repo to show your support!

---

## 🌐 بالعربي

> 🧠 مجموعة سكريبتات لتحويل محادثات ChatGPT إلى ملفات Markdown منسقة بعناية، مثالية لـ **Obsidian** و **Logseq** وغيرها.
>
> ✅ عدة أنماط تصدير (Outliner، Callouts، بسيط، عام)
> ✅ إضافة YAML Frontmatter تلقائي (العنوان، الوسوم، التاريخ)
> ✅ دعم الأكواد، القوائم، الاقتباسات، والنصوص متعددة اللغات
>
> **كيفية الاستخدام**:
>
> 1. افتح صفحة المحادثة في ChatGPT.
> 2. افتح Console المتصفح.
> 3. الصق الكود من السكريبت المناسب.
> 4. اضغط Enter لتحميل الملف `.md` فورًا! 🚀

---

Enjoy building your second brain smarter! 🧠🚀
