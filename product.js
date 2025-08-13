let products = [
    {
        name: 'JBL E55BT KEY BLACK',
        image1: 'images/HeadPhoneLP.png',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL JR 310BT',
        image1: 'images/headphones2.png',
        old_price: '1000',
        curr_price: '650'
    },
    {
        name: 'JBL TUNE 750BTNC',
        image1: 'images/headphones1.png',
        old_price: '700',
        curr_price: '350'
    },
    {
        name: 'JBL Horizon',
        image1: 'images/headphones3.png',
        old_price: '400',
        curr_price: '100'
    },
    {
        name: 'JBL Tune 220TWS',
        image1: 'images/PSP2.webp',
        old_price: '200',
        curr_price: '150'
    },
    {
        name: 'UA Project Rock',
        image1: 'images/sec2 p1.png',
        old_price: '400',
        curr_price: '300'
    }
];

let product_list = document.querySelector('#products');
let deleteMode = false;

function renderProducts(products) {
    product_list.innerHTML = "";
    products.forEach((e, index) => {
        let prod = `
            <div class="col-4 col-md-6 col-sm-12 product-item" data-index="${index}" style="position: relative;">
                ${deleteMode ? `<div class="remove-btn" style="
                    position:absolute;
                    right:10px;
                    top:10px;
                    cursor:pointer;
                    font-size:20px;
                    background:white;
                    border-radius:50%;
                    width:25px;
                    height:25px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:red;
                    font-weight:bold;
                ">✖</div>` : ""}
                <div class="product-card">
                    <div class="product-card-img">
                        <img src="${e.image1}" alt="">
                        <img src="${e.image2}" alt="">
                    </div>
                    <div class="product-card-info">
                        <div class="product-btn">
                            <a class="btn-flat btn-hover btn-shop-now">shop now</a>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                        </div>
                        <div class="product-card-name">${e.name}</div>
                        <div class="product-card-price">
                            <span><del>${e.old_price}</del></span>
                            <span class="curr-price">${e.curr_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        product_list.insertAdjacentHTML("beforeend", prod);
    });

    if (deleteMode) {
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.closest(".product-item").dataset.index;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This product will be removed!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        products.splice(index, 1);
                        renderProducts(products);
                        Swal.fire('Deleted!', 'Product has been removed.', 'success');
                    }
                });
            });
        });
    }
}

renderProducts(products);

document.querySelector("#add-product").addEventListener("click", () => {
    Swal.fire({
        title: 'Add New Product',
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Product Name">
            <input id="swal-price" type="number" class="swal2-input" placeholder="Price">
        `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const price = document.getElementById('swal-price').value;
            if (!name || !price) {
                Swal.showValidationMessage('Please enter name and price');
            }
            return { name, price };
        }
    }).then(result => {
        if (result.isConfirmed) {
            products.push({
                name: result.value.name,
                image1: 'images/se2 P2.webp',
                old_price: result.value.price,
                curr_price: result.value.price-100
            });
            renderProducts(products);
        }
    });
    
});

document.querySelector("#toggle-remove").addEventListener("click", () => {
    deleteMode = !deleteMode;
    renderProducts(products);
});


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added!`,
        timer: 1500,
        showConfirmButton: false
    });
}

function renderProducts(products) {
    product_list.innerHTML = "";
    products.forEach((e, index) => {
        let prod = `
            <div class="col-4 col-md-6 col-sm-12 product-item" data-index="${index}" style="position: relative;">
                ${deleteMode ? `<div class="remove-btn" style="
                    position:absolute;
                    right:10px;
                    top:10px;
                    cursor:pointer;
                    font-size:20px;
                    background:white;
                    border-radius:50%;
                    width:25px;
                    height:25px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:red;
                    font-weight:bold;
                ">✖</div>` : ""}
                <div class="product-card">
                    <div class="product-card-img">
                        <img src="${e.image1}" alt="">
                        <img src="${e.image2 || e.image1}" alt="">
                    </div>
                    <div class="product-card-info">
                        <div class="product-btn">
                            <a class="btn-flat btn-hover btn-shop-now">shop now</a>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                        </div>
                        <div class="product-card-name">${e.name}</div>
                        <div class="product-card-price">
                            <span><del>${e.old_price}</del></span>
                            <span class="curr-price">${e.curr_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        product_list.insertAdjacentHTML("beforeend", prod);
    });

    if (deleteMode) {
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.closest(".product-item").dataset.index;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This product will be removed!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        products.splice(index, 1);
                        renderProducts(products);
                        Swal.fire('Deleted!', 'Product has been removed.', 'success');
                    }
                });
            });
        });
    }

    document.querySelectorAll(".btn-shop-now, .btn-cart-add").forEach(btn => {
        btn.addEventListener("click", function () {
            let index = this.closest(".product-item").dataset.index;
            addToCart(products[index]);
        });
    });
}

renderProducts(products);

function openCart() {
    document.getElementById("cart-sidebar").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
    loadCartItems();
}

function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("active");
    document.getElementById("cart-overlay").classList.remove("active");
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart-items");
    let total = 0;

    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.curr_price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image1}" alt="${item.name}">
                <div style="flex:1">
                    <p>${item.name}</p>
                    <small>$${item.curr_price} x ${item.quantity}</small>
                </div>
                <button class="remove-from-cart" data-index="${index}" style="background:red;color:white;border:none;padding:3px 6px;cursor:pointer;">X</button>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);

    document.querySelectorAll(".remove-from-cart").forEach(btn => {
        btn.addEventListener("click", function() {
            let index = this.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCartItems();
        });
    });
}

document.querySelector(".bx-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);


document.addEventListener('DOMContentLoaded', function () {
  const headerWrapper = document.querySelector('.header-wrapper');
  const openBtn       = document.querySelector('.mb-menu-toggle');
  const closeBtn      = document.querySelector('.mb-menu-close');

  const cartSidebar   = document.getElementById('cart-sidebar');
  const cartOverlay   = document.getElementById('cart-overlay');
  const openCartLink  = document.getElementById('open-cart-link');

  const openMenu = () => {
    headerWrapper.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    headerWrapper.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtn && openBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  document.querySelectorAll('.main-menu a, .user-menu a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 1279) closeMenu();
    });
  });

  const openCart  = () => { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); };
  const closeCart = () => { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); };

  openCartLink && openCartLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
    closeMenu();
  });

  document.querySelectorAll('.bx-cart').forEach(icon => {
    const a = icon.closest('a');
    a && a.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); closeCart(); }
  });
});

document.querySelectorAll('.mega-dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 1279) {
      e.preventDefault(); 
      this.parentElement.classList.toggle('open');
    }
  });
});
