(function() {
    console.log("🚀 جاري استخراج المحادثة وتحويلها إلى تحفة فنية لـ Obsidian...");

    function htmlToMarkdown(node) {
        let markdownText = '';
        const childNodes = Array.from(node.childNodes);

        childNodes.forEach((child) => {
            switch (child.nodeName) {
                case '#text':
                    markdownText += child.textContent;
                    break;
                case 'P':
                    markdownText += '\n' + htmlToMarkdown(child).trim() + '\n';
                    break;
                case 'H1': markdownText += `# ${htmlToMarkdown(child)}\n\n`; break;
                case 'H2': markdownText += `## ${htmlToMarkdown(child)}\n\n`; break;
                case 'H3': markdownText += `### ${htmlToMarkdown(child)}\n\n`; break;
                case 'UL':
                case 'OL':
                    const listItems = Array.from(child.children).map((li, i) =>
                        (child.nodeName === 'OL' ? `${i + 1}. ` : '* ') + htmlToMarkdown(li).trim()
                    ).join('\n');
                    markdownText += `\n${listItems}\n\n`;
                    break;
                case 'LI':
                    markdownText += htmlToMarkdown(child);
                    break;
                case 'STRONG': case 'B':
                    markdownText += `**${htmlToMarkdown(child)}**`;
                    break;
                case 'EM': case 'I':
                    markdownText += `*${htmlToMarkdown(child)}*`;
                    break;
                case 'BLOCKQUOTE':
                    const blockquoteContent = htmlToMarkdown(child).trim().split('\n').map(line => `> ${line}`).join('\n');
                    markdownText += `\n${blockquoteContent}\n\n`;
                    break;
                case 'PRE':
                    const lang = child.querySelector('.justify-between')?.innerText.trim() || 'js';
                    const code = child.querySelector('code')?.innerText || '';
                    markdownText += `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n\n`;
                    break;
                case 'CODE':
                    if (child.parentElement.nodeName !== 'PRE') {
                        markdownText += `\`${child.textContent}\``;
                    }
                    break;
                case 'BR': markdownText += '\n'; break;
                case 'HR': markdownText += '\n---\n\n'; break;
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

    // YAML Frontmatter لـ Obsidian
    markdownLines.push('---');
    markdownLines.push(`title: "${chatTitle.replace(/"/g, '\\"')}"`);
    markdownLines.push(`tags: [محادثة, chatgpt-export, ${chatTitle.replace(/\s+/g, '-').toLowerCase()}]`);
    markdownLines.push(`date: ${timestamp}`);
    markdownLines.push('---');
    markdownLines.push(`\n# 📜 ${chatTitle}\n`);

    turns.forEach((turn) => {
        const userMsgDiv = turn.querySelector('div[data-message-author-role="user"] .whitespace-pre-wrap');
        const assistantMsgDiv = turn.querySelector('div[data-message-author-role="assistant"] .markdown.prose');

        if (userMsgDiv && userMsgDiv.innerText.trim()) {
            const content = userMsgDiv.innerText.trim();
            markdownLines.push(`> [!QUESTION] 🧑‍💻 سؤالك يا بطل`);
            content.split('\n').forEach(line => {
                markdownLines.push(`> ${line}`);
            });
            markdownLines.push('\n'); 
        } else if (assistantMsgDiv) {
            const markdownContent = htmlToMarkdown(assistantMsgDiv).trim();
            markdownLines.push(`> [!TIP] 🤖 رد المساعد`);
            markdownContent.split('\n').forEach(line => {
                // Ensure every line, even empty ones within a block, is part of the callout
                if (line.trim() === '' && markdownContent.includes('\n\n')) {
                    markdownLines.push('>'); 
                } else if (line.trim() !== '') {
                    markdownLines.push(`> ${line}`);
                }
            });
            markdownLines.push('\n');
        }
    });

    if (markdownLines.length <= 4) {
        console.error("😔 لم يتم العثور على محتوى. هل أنت في صفحة المحادثة؟");
        return;
    }

    const fullMarkdown = markdownLines.join('\n').replace(/\n{3,}/g, '\n\n');

    const safeTitle = chatTitle.replace(/[\/\\?%*:|"<>]/g, '-').replace(/\s+/g, ' ');

    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅🎉 تمت العملية بنجاح! تم تحميل ملف "${a.download}" بتنسيق Obsidian Callouts الاحترافي.`);
})();
