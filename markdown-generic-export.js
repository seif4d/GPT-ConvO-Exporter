(function() {
    console.log("🚀 بدء عملية استخراج المحادثة لتحويلها إلى ملف Markdown...");

    /**
     * دالة بسيطة لتحويل عناصر HTML الأساسية إلى Markdown.
     * @param {Node} node - العنصر الذي سيتم تحويله.
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
                    markdownText += '\n' + htmlToMarkdown(child) + '\n';
                    break;
                case 'H2':
                    markdownText += `## ${htmlToMarkdown(child)}\n\n`;
                    break;
                case 'UL':
                    markdownText += htmlToMarkdown(child);
                    break;
                case 'OL':
                     // لإضافة ترقيم للقوائم المرتبة
                    const olNodes = Array.from(child.childNodes);
                    olNodes.forEach((liNode, i) => {
                         if(liNode.nodeName === 'LI'){
                           markdownText += `${i+1}. ${htmlToMarkdown(liNode)}\n`;
                         }
                    });
                    break;
                case 'LI':
                    markdownText += `* ${htmlToMarkdown(child)}\n`;
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
                    const lang = child.querySelector('.justify-between')?.innerText.trim() || 'code';
                    const code = child.querySelector('code')?.innerText || '';
                    markdownText += `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n\n`;
                    break;
                case 'CODE':
                     // للـ inline code
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
                     // للأقسام الأخرى، نستخرج المحتوى الداخلي فقط
                    markdownText += htmlToMarkdown(child);
            }
        });
        return markdownText;
    }


    const turns = document.querySelectorAll('[data-testid^="conversation-turn-"]');
    const markdownLines = [];
    const chatTitle = document.title || 'محادثة ChatGPT';

    markdownLines.push(`# 📜 ${chatTitle}\n`);

    turns.forEach((turn, index) => {
        const userMsgDiv = turn.querySelector('div[data-message-author-role="user"] .whitespace-pre-wrap');
        const assistantMsgDiv = turn.querySelector('div[data-message-author-role="assistant"] .markdown.prose');

        if (userMsgDiv) {
            markdownLines.push(`### 🧑‍💻 المستخدم\n`);
            markdownLines.push(userMsgDiv.innerText.trim() + '\n');
        } else if (assistantMsgDiv) {
            markdownLines.push(`### 🤖 المساعد\n`);
            const markdownContent = htmlToMarkdown(assistantMsgDiv).trim();
            markdownLines.push(markdownContent + '\n');
        }
        markdownLines.push('---\n');
    });

    if (markdownLines.length <= 2) {
        console.error("😔 لم يتم العثور على محتوى. هل أنت في صفحة المحادثة؟");
        return;
    }

    const fullMarkdown = markdownLines.join('\n');

    // إنشاء رابط وهمي لتحميل الملف
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = chatTitle.replace(/[^a-z0-9א-ת一-龠]/gi, '-').toLowerCase();
    const timestamp = new Date().toISOString().slice(0, 10);
    a.download = `${safeTitle}-${timestamp}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅🎉 نجحت العملية! تم بدء تحميل ملف "${a.download}".`);
})();

