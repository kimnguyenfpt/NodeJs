// Global state
let currentPage = 1;
const limitPerPage = 8;

function fetchProducts(page, limit) {
    var url = `http://localhost:3000/api/products/page/${page}/limit/${limit}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const products = data.products; 
            const totalPages = data.totalPages;
            displayProducts(products);
            updatePagination(currentPage, totalPages);
        })
        .catch((error) => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; 

    products.forEach((pro) => {
        const productHTML = `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="./img/${pro.img}" alt="${pro.name}">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" href="#" onclick="themvaogio(${pro.id},'${pro.name}','${pro.img}',${pro.price})"><i class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href="detail.html" onclick="arr_Detail(${pro.id})"><i class="fa fa-search"></i></a>
                    </div>
                </div>
                <div class="text-center py-4">
                    <a class="h6 text-decoration-none text-truncate" href="detail.html?id=${pro.id}">${pro.name}</a>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                        <h5>${pro.price} vnd</h5><h6 class="text-muted ml-2"><del>${Math.round(pro.price * 1.2)} vnd</del></h6>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mb-1">
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                    </div>
                </div>
            </div>
        </div>`;

        container.insertAdjacentHTML('beforeend', productHTML);
    });
}


function updatePagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear current pagination
    
    // Previous button
    const prevClass = currentPage === 1 ? 'disabled' : '';
    pagination.innerHTML += `<li class="page-item ${prevClass}" onclick="changePage(${currentPage - 1})"><a class="page-link" href="#">Previous</a></li>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        pagination.innerHTML += `<li class="page-item ${activeClass}" onclick="changePage(${i})"><a class="page-link" href="#">${i}</a></li>`;
    }

    // Next button
    const nextClass = currentPage === totalPages ? 'disabled' : '';
    pagination.innerHTML += `<li class="page-item ${nextClass}" onclick="changePage(${currentPage + 1})"><a class="page-link" href="#">Next</a></li>`;
}

function changePage(page) {
    currentPage = page;
    fetchProducts(page, limitPerPage);
}

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(currentPage, limitPerPage);
});



