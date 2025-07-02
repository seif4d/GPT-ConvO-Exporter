(function() {
    console.log("🚀 بدء استخراج المحادثة وتنسيقها لبرنامج Obsidian...");

    /**
     * دالة مخصصة لتحويل عقد HTML إلى Markdown نظيف.
     * @param {Node} node - العقدة المراد تحويلها.
     * @returns {string} - النص بصيغة Markdown.
     */
    function htmlToMarkdown(node) {
        let markdownText = '';
        const childNodes = Array.from(node.childNodes);

        childNodes.forEach((child, index) => {
            switch (child.nodeName) {
                case '#text':
                    markdownText += child.textContent;
                    break;
                case 'P':
                    markdownText += '\n' + htmlToMarkdown(child).trim() + '\n';
                    break;
                case 'H2':
                    markdownText += `## ${htmlToMarkdown(child)}\n\n`;
                    break;
                case 'H3':
                    markdownText += `### ${htmlToMarkdown(child)}\n\n`;
                    break;
                case 'UL':
                case 'OL':
                    const listItems = Array.from(child.children).map((li, i) =>
                        (child.nodeName === 'OL' ? `${i + 1}. ` : '* ') + htmlToMarkdown(li).trim()
                    ).join('\n');
                    markdownText += `\n${listItems}\n\n`;
                    break;
                case 'LI':
                    // يتم معالجته داخل UL/OL
                    markdownText += htmlToMarkdown(child);
                    break;
                case 'STRONG':
                case 'B':
                    markdownText += `**${htmlToMarkdown(child)}**`;
                    break;
                case 'EM':
                case 'I':
                    markdownText += `*${htmlToMarkdown(child)}*`;
                    break;
                case 'BLOCKQUOTE':
                    const blockquoteContent = htmlToMarkdown(child).trim().split('\n').map(line => `> ${line}`).join('\n');
                    markdownText += `\n${blockquoteContent}\n\n`;
                    break;
                case 'PRE':
                    const lang = child.querySelector('.justify-between')?.innerText.trim() || 'javascript'; // افتراضيا js
                    const code = child.querySelector('code')?.innerText || '';
                    markdownText += `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n\n`;
                    break;
                case 'CODE':
                    if (child.parentElement.nodeName !== 'PRE') {
                        markdownText += `\`${child.textContent}\``;
                    }
                    break;
                case 'BR':
                    markdownText += '\n';
                    break;
                case 'HR':
                    markdownText += '\n---\n\n';
                    break;
                default:
                    if (child.hasChildNodes()) {
                        markdownText += htmlToMarkdown(child);
                    }
            }
        });
        return markdownText;
    }

    const turns = document.querySelectorAll('[data-testid^="conversation-turn-"]');
    const markdownLines = [];
    const chatTitle = document.title || 'محادثة ChatGPT';
    const timestamp = new Date().toISOString();

    // إضافة الـ Frontmatter (YAML) لـ Obsidian
    markdownLines.push('---');
    markdownLines.push(`title: "${chatTitle}"`);
    markdownLines.push(`tags: [محادثة, chatgpt-export]`);
    markdownLines.push(`date: ${timestamp}`);
    markdownLines.push('---');
    markdownLines.push(`\n# 📜 ${chatTitle}\n`);

    turns.forEach((turn) => {
        const userMsgDiv = turn.querySelector('div[data-message-author-role="user"] .whitespace-pre-wrap');
        const assistantMsgDiv = turn.querySelector('div[data-message-author-role="assistant"] .markdown.prose');

        if (userMsgDiv && userMsgDiv.innerText.trim()) {
            markdownLines.push(`\n### 🧑‍💻 المستخدم\n`);
            // الاقتباس يجعل رسائل المستخدم مميزة بصريًا
            markdownLines.push(`> ${userMsgDiv.innerText.trim().replace(/\n/g, '\n> ')}\n`);
        } else if (assistantMsgDiv) {
            markdownLines.push(`\n### 🤖 المساعد\n`);
            const markdownContent = htmlToMarkdown(assistantMsgDiv).trim();
            markdownLines.push(markdownContent + '\n');
        }
        markdownLines.push('---\n');
    });

    if (markdownLines.length <= 4) {
        console.error("😔 لم يتم العثور على محتوى. هل أنت في صفحة المحادثة؟");
        return;
    }

    const fullMarkdown = markdownLines.join('\n').replace(/\n{3,}/g, '\n\n'); // تنظيف المسافات الزائدة

    const safeTitle = chatTitle.replace(/[\/\\?%*:|"<>]/g, '-').replace(/\s+/g, ' ');

    // إنشاء رابط وهمي لتحميل الملف
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅🎉 تمت العملية بنجاح! تم تحميل ملف "${a.download}" المتوافق مع Obsidian.`);
})();
