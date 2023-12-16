import Swal from 'sweetalert2';
import axios from 'axios';

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://roomie-lfta.onrender.com/';
const apiPath = 'contacts';
const apiUrl = `${baseUrl}${apiPath}`;
const contactForm = document.querySelector('.contact-form');
const textarea = contactForm.querySelector('#content-txt');
const emailInput = contactForm.querySelector('#contact-email');
const emailError = contactForm.querySelector('.email-error');

const UserMail = {
    async post(params) {
        try {
            const data = {
                ...params,
                userId: Number(localStorage.getItem('userId')),
                isReply: false,
            };
            const res = await axios.post(`${apiUrl}`, data);
            Swal.fire({
                scrollbarPadding: false,
                icon: 'success',
                title: '感謝您的留言，我們將於 7 - 14 天內給予您答覆！',
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false
            });
            console.log(res);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
}

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
    const txt = contactForm['content-txt'].value;

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

    if (!txt) {
        textarea.classList.add('is-invalid');
    } else {
        textarea.classList.remove('is-invalid');
    }

    console.log(contactForm.querySelectorAll('.invalid-feedback'));
    if (!name || !mail || !checkMail(mail) || !txt) {
        return
    }
    const params = {
        name,
        mail,
        txt
    }
    UserMail.post(params);
    console.log(params)
    contactForm.reset();
})

function checkMail(value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}