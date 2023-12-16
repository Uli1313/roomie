function loading(apiData) {
    const loading = document.querySelector('.loading');
    if (apiData) {
        loading.style.opacity = 0;
        setTimeout(() => loading.classList.add('d-none'), 1000);
        document.body.style.overflow = 'auto';
    } else {
        loading.classList.remove('d-none');
        loading.style.opacity = 1;
        document.body.style.overflow = 'hidden';
    }
}


export { loading }