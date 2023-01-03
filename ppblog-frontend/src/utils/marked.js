// import { marked } from 'marked'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/an-old-hope.css'

// const instance = new marked.Renderer()

// marked.setOptions({
//     renderer: instance, // 这是必填项
//     gfm: true,	// 启动类似于Github样式的Markdown语法
//     pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
//     sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
//     // 高亮的语法规范
//     highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
// })

// export default marked

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        // 此处判断是否有添加代码语言
        if (lang && hljs.getLanguage(lang)) {
            try {
                // 得到经过highlight.js之后的html代码
                const preCode = hljs.highlight(lang, str, true).value
                // 以换行进行分割
                const lines = preCode.split(/\n/).slice(0, -1)
                // 添加自定义行号
                let html = lines.map((item, index) => {
                    return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
                }).join('')
                html = '<ol>' + html + '</ol>'
                return '<pre class="hljs"><code>' +
                    html +
                    '</code></pre>'
            } catch (__) { }
        }
        // 未添加代码语言，此处与上面同理
        const preCode = md.utils.escapeHtml(str)
        const lines = preCode.split(/\n/).slice(0, -1)
        let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
        }).join('')
        html = '<ol>' + html + '</ol>'
        return '<pre class="hljs"><code>' +
            html +
            '</code></pre>'
    }
})

export default md