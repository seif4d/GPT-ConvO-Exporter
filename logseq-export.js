(function() {
    console.log("🚀 جاري إعادة الاستخراج والتنسيق بأسلوب Logseq الأصلي...");

    /**
     * دالة مخصصة لتحويل عقد HTML إلى بلوكات Markdown متوافقة مع Logseq.
     * @param {Node} node - العقدة التي سيتم معالجتها.
     * @param {string} prefix - المسافة البادئة للبلوك الحالي.
     * @returns {string} - سلسلة نصية تحتوي على بلوكات Markdown.
     */
    function processNodeForLogseq(node, prefix = '  - ') {
        let result = '';
        switch (node.nodeName) {
            case 'P':
                // الفقرات تكون بلوك واحد، حتى لو كانت متعددة الأسطر في HTML
                result += `${prefix}${node.innerText.replace(/\n/g, ' ')}\n`;
                break;
            case 'UL':
            case 'OL':
                // القوائم تصبح بلوكات متداخلة
                Array.from(node.children).forEach(li => {
                    result += `${prefix}${node.nodeName === 'OL' ? '1. ' : '* '}${li.innerText.trim()}\n`;
                });
                break;
            case 'H2':
                result += `${prefix}## ${node.innerText.trim()}\n`;
                break;
            case 'H3':
                 result += `${prefix}### ${node.innerText.trim()}\n`;
                break;
            case 'PRE':
                // بلوكات الكود تحتاج لمعاملة خاصة
                const lang = node.querySelector('.justify-between')?.innerText.trim() || '';
                const code = node.querySelector('code')?.innerText || '';
                result += `${prefix}\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
                break;
            case 'BLOCKQUOTE':
                const quoteText = Array.from(node.childNodes).map(child => child.innerText || child.textContent).join('\n');
                result += `${prefix}> ${quoteText.replace(/\n/g, '\n> ')}\n`;
                break;
            case 'HR':
                 result += `${prefix}---\n`;
                 break;
            default:
                // تجاهل العقد غير المهمة مثل التعليقات والنصوص الفارغة
                if (node.nodeType !== Node.COMMENT_NODE && node.textContent.trim() !== '') {
                   console.log(`عقدة غير معالجة: ${node.nodeName}`);
                }
        }
        return result;
    }

    const turns = document.querySelectorAll('[data-testid^="conversation-turn-"]');
    const markdownLines = [];
    const chatTitle = document.title || 'محادثة ChatGPT';

    // خصائص الصفحة لـ Logseq
    const today = new Date();
    const formattedDate = `[[${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}]]`;
    markdownLines.push(`- title:: ${chatTitle}`);
    markdownLines.push(`- tags:: #محادثة, #chatgpt-export`);
    markdownLines.push(`- created:: ${formattedDate}\n`);
    markdownLines.push(`- ## المحادثة 📜\n`);

    turns.forEach((turn) => {
        const userMsgDiv = turn.querySelector('div[data-message-author-role="user"] .whitespace-pre-wrap');
        const assistantMsgDiv = turn.querySelector('div[data-message-author-role="assistant"] .markdown.prose');

        if (userMsgDiv && userMsgDiv.innerText.trim()) {
            markdownLines.push(`  - 🧑‍💻 **المستخدم**`);
            // كل سطر جديد من المستخدم هو بلوك فرعي
            userMsgDiv.innerText.trim().split('\n').forEach(line => {
                markdownLines.push(`    - ${line}`);
            });
        } else if (assistantMsgDiv) {
            markdownLines.push(`  - 🤖 **المساعد**`);
            // كل عنصر ابن (p, ul, pre) هو بلوك فرعي
            Array.from(assistantMsgDiv.children).forEach(childNode => {
                markdownLines.push(processNodeForLogseq(childNode, '    - '));
            });
        }
    });

    if (markdownLines.length <= 4) {
        console.error("😔 لم يتم العثور على محتوى. هل أنت في صفحة المحادثة؟");
        return;
    }

    // إزالة الأسطر الفارغة الزائدة الناتجة عن المعالجة
    const fullMarkdown = markdownLines.filter(line => line.trim() !== '').join('\n');

    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = chatTitle.replace(/[\/\\?%*:|"<>]/g, '-').replace(/\s+/g, ' ');
    a.download = `${safeTitle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅🎉 تمت العملية بنجاح! تم تحميل ملف "${a.download}" المتوافق تمامًا مع Logseq.`);
})();
