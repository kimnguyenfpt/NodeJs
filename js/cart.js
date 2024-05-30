// document.querySelector('btncheckout').onclick = function(){
//     document.location = "checkout.html";
// }

function xoaSanPham(index) {
    // Xóa sản phẩm khỏi giỏ hàng theo chỉ số index
    cart.splice(index, 1);
    // Cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Load lại phần hiển thị giỏ hàng
    loadGioHang();
}

function tinhTien(price, quantity, index) {
    
    var tc = price * quantity;

    
    document.querySelectorAll('.tien')[index].textContent = tc;

    
    cart[index].quantity = quantity;

    
    localStorage.setItem("cart", JSON.stringify(cart));

    
    tinhTongTien();
}

function updateCartItemCount() {
    let cartItemCount = getCartItemCount();
    let badgeElement = document.querySelector('#cartItemCount');
    if (badgeElement) {
        badgeElement.textContent = cartItemCount.toString();
    }
}

function tinhTongTien() {
    var total = 0;
    var tienElements = document.querySelectorAll('.tien');
    for (var i = 0; i < tienElements.length; i++) {
        total += Number(tienElements[i].textContent);
    }

    
    var totals = total + 200000;

    // Format the total and totals with thousands separator
    var formattedTotal = total.toLocaleString('en-US');
    var formattedTotals = totals.toLocaleString('en-US');

    // Update the total cost in the cart with formatted value
    document.querySelector('#total').textContent = formattedTotal;

    // Update the totals (total + 200000) in a different element with formatted value
    document.querySelector('#totals').textContent = formattedTotals;
}

function loadGioHang() {
    // Xóa nội dung cũ trong phần tb_cart
    document.querySelector('#tb_cart').innerHTML = "";
    // Tính toán và hiển thị giỏ hàng mới
    hiengiohang();
}
var tt = 0;
function hiengiohang(){
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) cart.forEach((pro,index) => {
        var tc = pro.price*pro.quantity;
        tt += tc;
        document.querySelector('#tb_cart').innerHTML +=`
        <tr>
                <td class="align-middle"><img src="img/${pro.image}" alt="" style="width:50px;">${pro.name}</td>
                <td class="align-middle">${pro.price}</td>
                <td class="align-middle">
                    <input type="number" min =1 value= ${pro.quantity}
                    onkey = 'tinhTien(${pro.price}, this.value, ${index})'
                    onchange = 'tinhTien(${pro.price}, this.value, ${index})'
                >
                </td>
                <td class="tien align-middle"> ${tc} </td>
                <td class="align-middle"><button class="btn btn-sm btn-danger"  onclick="xoaSanPham(${index})" ><i class="fa fa-times"></i></button></td>
         </tr>`
    })
    tinhTongTien();
    updateCartItemCount();
}
hiengiohang();
