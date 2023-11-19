const commentContent = document.querySelector('.comment-content');

// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
        const html = editor.getHtml() // 獲取用戶輸入的 html 結構
        text = editor.getText()
        commentContent.innerHTML = html.replace(/<p><br><\/p>/g, "") // 把內容渲染到預覽頁面上
    }
};

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
});

const toolbarConfig = {
    toolbarKeys: ['bold', 'underline', 'italic', '|', 'undo', 'redo'] // 工具欄重新配置
};

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
});