document.addEventListener("DOMContentLoaded", () => {
    const subFlag = document.querySelector('#container').classList.contains('sub');
    if(!subFlag) return;

    safeRun(sub_header, "sub_header");
});

function sub_header() {
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');

    breadcrumbItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    })
}
