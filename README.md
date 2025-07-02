# 🧠 GPT-ConvO-Exporter

Scripts to export your ChatGPT conversations into beautifully formatted Markdown files, tailor-made for your Personal Knowledge Management (PKM) system like **Obsidian** and **Logseq**.

*(You can replace this with your own screenshot!)*

---

## ✨ Features

- ✅ **Multiple Formats:** Choose the perfect export format for your needs.
- 🔥 **Logseq Outliner:** Preserves the block-based structure, perfect for outlining and folding.
- 💎 **Obsidian Callouts:** Creates a visually stunning and organized conversation using Obsidian's callout feature.
- ✍️ **Obsidian Simple:** A clean, readable Markdown format for a classic notes look.
- 📜 **Generic Markdown:** A standard format compatible with any Markdown editor.
- ⚙️ **Automatic Metadata:** Adds YAML frontmatter (title, tags, date) for better organization in Obsidian.
- 💻 **Full Formatting Support:** Correctly handles code blocks (with language detection), lists, quotes, bold/italic text, and more.

---

## 🛠️ How to Use

It's as simple as this:

1.  On a ChatGPT conversation page, open your browser's **Developer Console** (`F12` or `Ctrl+Shift+I`).
2.  Navigate to the **Console** tab.
3.  Copy the entire code from one of the script files.
4.  Paste it into the console and press `Enter`.
5.  Your `.md` file will start downloading immediately! 🚀

---

## ⚔️ The Scripts

| File                       | Description                                                     | Best For                               |
| -------------------------- | --------------------------------------------------------------- | -------------------------------------- |
| `logseq-export.js`         | Exports as a nested list, respecting Logseq's outliner structure. | **Logseq** users                       |
| `obsidian-callouts-export.js`| Uses stylish callouts (`[!QUESTION]`, `[!TIP]`) for each turn.  | **Obsidian** users who love visuals    |
| `obsidian-simple-export.js`| Uses headers and blockquotes for a clean, readable format.      | **Obsidian** users who prefer simplicity |
| `markdown-generic-export.js` | A standard Markdown export with headers and separators.         | Any other Markdown app (Notion, etc.)  |

---

## ⚖️ License

This project is licensed under the MIT License. Feel free to use, modify, and share. Knowledge is for everyone! ❤️

---

## 💌 Credits

This project was forged by seif4d 🥷🏻 and his AI companion.

If you like this project, don't forget to leave a ⭐ on GitHub!

----

# 🧠 ChatGPT Conversation Exporter

🚀 مجموعة سكريبتات ذكية لتحويل محادثات ChatGPT إلى ملفات Markdown مُنسقة بعناية، لتكون مثالية لأدوات إدارة المعرفة مثل **Logseq** و **Obsidian** وغيرها.

![screenshot](https://your-screenshot-link.png)

---

## 💎 الميزات

✅ دعم تصدير محادثاتك بعدة أشكال:
- 🔥 **Logseq Outliner:** يحترم البلوكات والتداخل ليسهل عليك الطي والتنقل.
- ⚡ **Obsidian Callouts:** تحويل المحادثة إلى لوحات فنية قابلة للطي بميزة Callouts.
- ✍️ **Obsidian Simple Markdown:** تنسيق بسيط وواضح مناسب لأي ثيم في Obsidian.
- 📜 **Generic Markdown:** تصدير نظيف متوافق مع أي محرر Markdown.

✅ إضافة **YAML Frontmatter** تلقائيًا (العنوان، الوسوم، التاريخ).

✅ دعم القوائم، النصوص السميكة والمائلة، الاقتباسات، وأكواد متعددة الأسطر.

---

## 🛠️ كيفية الاستخدام

1. افتح صفحة المحادثة في ChatGPT التي تريد تصديرها.
2. افتح الـ **Console** في المتصفح (`F12` → Console).
3. الصق الكود الخاص بالتنسيق الذي تريده، واضغط `Enter`.
4. سيبدأ تنزيل ملف `.md` جاهز.

---

## ⚔️ السكريبتات المتاحة

| السكريبت                  | الوصف |
|---------------------------|-------|
| `logseq-export.js`         | لتصدير المحادثة بأسلوب Outliner المتوافق مع Logseq. |
| `obsidian-callouts-export.js` | لتصدير المحادثة داخل Callouts مميزة بأيقونات وألوان في Obsidian. |
| `obsidian-simple-export.js` | لتصدير Markdown بسيط ومنسق للقراءة في Obsidian. |
| `markdown-generic-export.js` | لتصدير Markdown عام يناسب أي محرر. |

---

## ✨ أمثلة على النتائج

> [!QUESTION] 🧑‍💻 سؤال المستخدم  
> ما أفضل طريقة لتنظيم المعرفة الشخصية؟

> [!TIP] 🤖 رد المساعد  
> يمكنك استخدام أدوات مثل Logseq أو Obsidian لتخزين وربط ملاحظاتك، مع الاعتماد على مراجعات دورية.

---

## ⚖️ الرخصة
MIT License — استمتع وشارك المعرفة! ❤️
 

صاحب هذا المشروع: **أسطورة إدارة المعرفة 🥷🏻**  
إن أعجبك المشروع، لا تنسَ ترك ⭐ على GitHub لدعمي.  
