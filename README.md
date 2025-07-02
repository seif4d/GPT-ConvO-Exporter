# 🧠 GPT-ConvO-Exporter

🚀 Effortlessly export your ChatGPT conversations into beautiful Markdown files — perfect for your Personal Knowledge Management (PKM) system like **Obsidian**, **Logseq**, or any Markdown app.

---

## ✨ Features

✅ **Multiple export styles**:
- 🔥 **Logseq Outliner**: Keeps your notes block-based for outlining and folding.
- 💎 **Obsidian Callouts**: Uses `[!TIP]` and `[!QUESTION]` for eye-catching, collapsible notes.
- ✍️ **Obsidian Simple**: Clean, classic Markdown with headings and blockquotes.
- 📜 **Generic Markdown**: For Notion, VS Code, or any other editor.

✅ **YAML Frontmatter** for automatic metadata (title, tags, date).

✅ **Full formatting support** for:
- Code blocks with language detection
- Lists, blockquotes, bold, italic, horizontal rules
- Arabic & multi-language content friendly

---

## ⚙️ How to use

1. Open your ChatGPT conversation page.
2. Open your browser console (`F12` or `Ctrl+Shift+I` → Console tab).
3. Copy the content of any script (`.js` file) in this repo.
4. Paste it into the console and hit **Enter**.
5. Your `.md` file will download instantly! 🚀

---

## 🗂️ Available scripts

| File                       | Description                                    | Best for                 |
|-----------------------------|-----------------------------------------------|---------------------------|
| `logseq-export.js`          | Exports as a nested list (outliner style).     | Logseq users              |
| `obsidian-callouts-export.js` | Uses callouts `[!QUESTION]`, `[!TIP]`.         | Visual lovers in Obsidian |
| `obsidian-simple-export.js` | Simple Markdown with headings & blockquotes.   | Minimalists in Obsidian   |
| `markdown-generic-export.js` | Plain Markdown for any editor.                 | VS Code, Notion, etc.     |

---

## ⚖️ License

MIT License — use it, tweak it, share it. Knowledge wants to be free ❤️.

---

## 💌 Credits

Built by [seif4d](https://github.com/seif4d) 🥷🏻 with the help of his AI sidekick.  
If you like this, leave a ⭐ to show support!

---

## 📸 Example (Obsidian Callouts)

```markdown
> [!QUESTION] 🧑‍💻 Your question
What’s the best way to organize PKM notes?

> [!TIP] 🤖 GPT’s reply
You can use tools like Obsidian or Logseq to interlink your notes and review them periodically.
