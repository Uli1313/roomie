import Swal from 'sweetalert2';

const form = document.querySelectorAll('.needs-validation');
const sendBtn = document.querySelector('#sendBtn');

form.forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.classList.add('was-validated');
    });
});

sendBtn.addEventListener('click', function (e) {
    e.preventDefault();
    Swal.fire({
        title: "送出成功",
        text: "謝謝您的意見，我們將會在兩週內透過電子郵件聯絡您。",
        icon: "success"
    });
});
