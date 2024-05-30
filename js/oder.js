

function tinhTien(price, quantity, index) {
    // Calculate total cost for the current product
    var tc = price * quantity;

    // Update the total cost in the cart for the current product
    document.querySelectorAll('.tien')[index].textContent = tc;

    // Update the quantity in the cart
    cart[index].quantity = quantity;

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Recalculate the total cost for the whole cart
    tinhTongTien();
}


function tinhTongTien() {
    var total = 0;
    var tienElements = document.querySelectorAll('.tien');
    for (var i = 0; i < tienElements.length; i++) {
        total += Number(tienElements[i].textContent);
    }

    // Calculate totals (total + 200000)
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
    if (cart) cart.forEach((pro,index) => {   //Nếu giỏ hàng tồn tại, mã sẽ lặp qua mỗi sản phẩm (pro) trong giỏ hàng.
        var tc = pro.price*pro.quantity;  //Với mỗi sản phẩm, tính tổng cộng (tc) bằng cách nhân giá  với số lượng, sau đó cộng dồn vào biến tt để tính tổng tiền.
        tt += tc; //+= thêm nd mới mà kh ghi đè nd cũ
        document.querySelector('#tb').innerHTML +=`
        <div class="d-flex justify-content-between">
                            <p>${pro.name}</p>
                            <p class="tien">${tc}</p>
                        </div>
        `
    })
    tinhTongTien(); //hàm này là để tính toán và có thể cập nhật tổng tiền của toàn bộ giỏ hàng trên giao diện người dùng.
}
hiengiohang();
