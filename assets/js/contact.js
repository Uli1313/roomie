import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import Swal from 'sweetalert2';
import axios from 'axios';

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://roomie-lfta.onrender.com/';
const apiPath = '/contacts';
const apiUrl = `${baseUrl}${apiPath}`;
const contactForm = document.querySelector('.contact-form');
const textarea = contactForm.querySelector('#form-content');
const emailInput = contactForm.querySelector('#contact-email');
const emailError = contactForm.querySelector('.email-error');

const contacts = {
    post: function (params) {
        const data = {
            ...params,
            userId: Number(localStorage.getItem('userId')),
            isReply: false,
        };

        return axios.post(apiUrl, data)
            .then(function (res) {
                Swal.fire({
                    scrollbarPadding: false,
                    icon: 'success',
                    title: '謝謝您的意見，我們將會在兩週內透過電子郵件聯絡您。',
                    showConfirmButton: false,
                    timer: 1500,
                    allowOutsideClick: false
                });
                console.log(res);
                return res.data;
            })
            .catch(function (err) {
                console.log(err);
            });
    }
};

let content;
emailInput.addEventListener('input', (e) => {
    const { value } = e.target;
    if (!value) {
        emailError.textContent = '請輸入您的電子郵件'
    }
    if (!checkMail(value)) {
        emailError.textContent = '信箱格式錯誤'
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm['contact-name'].value;
    const mail = contactForm['contact-email'].value;

    if (!name) {
        contactForm['contact-name'].classList.add('is-invalid');
    } else {
        contactForm['contact-name'].classList.remove('is-invalid');
    }

    if (!mail || !checkMail(mail)) {
        contactForm['contact-email'].classList.add('is-invalid');
    } else {
        contactForm['contact-email'].classList.remove('is-invalid');
    }

    if (!content || content === '<p><br></p>') {
        textarea.classList.add('is-invalid');
    } else {
        textarea.classList.remove('is-invalid');
    }

    console.log(contactForm.querySelectorAll('.invalid-feedback'));
    if (!name || !mail || !checkMail(mail) || !content || content === '<p><br></p>') {
        return
    }
    const params = {
        name,
        mail,
        content
    }
    contacts.post(params);
    console.log(params)
    contactForm.reset();
})

function checkMail(value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}

// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '請輸入留言內容',
    onChange(editor) {
        const html = editor.getHtml() // 獲取用戶輸入的 html 結構
        content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
})