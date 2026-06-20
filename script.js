// 手機版漢堡選單開關
// 點擊右上角 ☰ 時，切換 nav 的 active class

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("active");
});

// 顧客評價切換功能

const reviews = [
  {
    stars: "★★★★★",
    text: "「湯頭很濃但不會太鹹，牛肉也很嫩，是會想再訪的店！」"
  },
  {
    stars: "★★★★★",
    text: "「半筋半肉麵超好吃，牛筋燉得很入味。」"
  },
  {
    stars: "★★★★☆",
    text: "「店面乾淨、服務親切，價格也合理。」"
  },
  {
    stars: "★★★★★",
    text: "「麵條很 Q，搭配紅燒湯頭剛剛好。」"
  }
];

let index = 0;

const reviewText = document.getElementById("review-text");
const reviewStars = document.getElementById("review-stars");
const changeReview = document.getElementById("changeReview");

changeReview.addEventListener("click", function () {
  index++;

  if (index >= reviews.length) {
    index = 0;
  }

  reviewStars.textContent = reviews[index].stars;
  reviewText.textContent = reviews[index].text;
});

// 回到頂部按鈕

const topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click",function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

// 菜單分類篩選

const filterBtns = document.querySelectorAll(".filter-btns button");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        const type = this.dataset.type;

        cards.forEach(card => {

            if (type === "all") {

                card.style.display = "block";

            } else if (card.classList.contains(type)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// 菜單輪播左右切換

const slider = document.getElementById("menuSlider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", function () {
  slider.scrollBy({
    left: 345,
    behavior: "smooth"
  });
});

prevBtn.addEventListener("click", function () {
  slider.scrollBy({
    left: -345,
    behavior: "smooth"
  });
});

// 菜單自動輪播

setInterval(function () {
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
    slider.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  } else {
    slider.scrollBy({
      left: 345,
      behavior: "smooth"
    });
  }
}, 3000);

// 加入購物車功能
// 點擊商品按鈕後加入購物車
// 若商品已存在則增加數量

const addCartBtns = document.querySelectorAll(".add-cart");
const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");
const clearCart = document.getElementById("clearCart");

let cart = [];

addCartBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = Number(this.dataset.price);

    const item = cart.find(product => product.name === name);

    if (item) {
      item.qty++;
    } else {
      cart.push({
        name: name,
        price: price,
        qty: 1
      });
    }

    renderCart();
  });
});

// 更新購物車畫面
// 顯示商品、數量與總金額

function renderCart() {
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");

    li.textContent = `${item.name} x ${item.qty} = NT$${item.price * item.qty}`;

    cartList.appendChild(li);

    total += item.price * item.qty;
  });

  totalPrice.textContent = total;
}

// 清空購物車
// 清除所有商品資料

clearCart.addEventListener("click", function () {
  cart = [];
  renderCart();
});

const checkoutBtn =
      document.getElementById("checkoutBtn");

const checkoutModal =
      document.getElementById("checkoutModal");

const submitOrder =
      document.getElementById("submitOrder");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){
        alert("購物車是空的！");
        return;
    }

    checkoutModal.style.display = "block";

});

// 送出訂單功能
// 點擊送出訂單後，檢查表單資料並產生訂單完成頁

submitOrder.addEventListener("click", () => {

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    if(name === ""){
        alert("請輸入姓名");
        return;
    }

    if(phone === ""){
        alert("請輸入電話");
        return;
    }

    if(address === ""){
        alert("請輸入地址");
        return;
    }

    let orderText = "";
    let total = 0;

    cart.forEach(item => {
        orderText += `${item.name} x ${item.qty} = NT$${item.price * item.qty}<br>`;
        total += item.price * item.qty;
    });

    const orderNo = "DN" + Date.now();

    document.body.innerHTML = `
      <div style="padding:80px 20px;text-align:center;font-family:'Microsoft JhengHei';">
        <h1>訂單成立成功</h1>

        <p>訂單編號：${orderNo}</p>
        <p>訂購人：${name}</p>
        <p>聯絡電話：${phone}</p>
        <p>外送地址：${address}</p>

        <hr style="margin:30px auto;max-width:500px;">

        <h2>訂購內容</h2>
        <p>${orderText}</p>

        <h2>總金額：NT$${total}</h2>

        <p>預計取餐時間：約 20 分鐘後</p>

        <button onclick="location.reload()" style="
          margin-top:30px;
          padding:12px 30px;
          border:none;
          border-radius:30px;
          background:#8B0000;
          color:white;
          cursor:pointer;
        ">
          返回首頁
        </button>
      </div>
    `;

});

// 關閉 Modal：點 X

const closeModal =
document.getElementById("closeModal");

closeModal.addEventListener("click", function(){

  checkoutModal.style.display = "none";

});

// 關閉 Modal：返回購物車

const cancelOrder =
document.getElementById("cancelOrder");

cancelOrder.addEventListener("click", function(){

  checkoutModal.style.display = "none";

});

// 關閉 Modal：點背景

window.addEventListener("click", function(e){

  if(e.target === checkoutModal){

      checkoutModal.style.display = "none";

  }

});

