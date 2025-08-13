let slide_index = 0;
let slide_play = true;
let slides = document.querySelectorAll(".slide");

hideAllSlide = () => {
  slides.forEach((e) => {
    e.classList.remove("active");
  });
};

showSlide = () => {
  hideAllSlide();
  slides[slide_index].classList.add("active");
};

nextSlide = () =>
  (slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1);

prevSlide = () =>
  (slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1);

document
  .querySelector(".slider")
  .addEventListener("mouseover", () => (slide_play = false));

document
  .querySelector(".slider")
  .addEventListener("mouseleave", () => (slide_play = true));

document.querySelector(".slide-next").addEventListener("click", () => {
  nextSlide();
  showSlide();
});

document.querySelector(".slide-prev").addEventListener("click", () => {
  prevSlide();
  showSlide();
});

showSlide();

let products = [
  {
    name: "JBL E55BT KEY BLACK",
    image1: "images/se2 P2.webp",
    old_price: "$400",
    curr_price: "$300",
  },
  {
    name: "JBL JR 310BT",
    image1: "images/sec2 p1.png",
    old_price: "$1000",
    curr_price: "$650",
  },
  {
    name: "JBL TUNE 750BTNC",
    image1: "images/earPods2.png",
    old_price: "$700",
    curr_price: "$350",
  },
  {
    name: "JBL Horizon",
    image1: "images/headphones1.png",
    old_price: "$400",
    curr_price: "$100",
  },
  {
    name: "JBL Tune 220TWS",
    image1: "images/headphones3.png",
    old_price: "$200",
    curr_price: "$150",
  },
];

let latestProducts = [products[0], products[1], products[2]];
let bestProducts = [products[2], products[3], products[4]];

let product_list = document.querySelector("#latest-products");
let best_product_list = document.querySelector("#best-products");

function renderProducts(container, items) {
  items.forEach((e) => {
    let prod = `
            <div class="col-3 col-md-6 col-sm-12">
                <div class="product-card">
                    <div class="product-card-img">
                        <img src="${e.image1}" alt="">
                    </div>
                    <div class="product-card-info">
                        <div class="product-btn">
                            <button class="btn-flat btn-hover btn-shop-now">shop now</button>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-heart'></i>
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
    container.insertAdjacentHTML("beforeend", prod);
  });
}

renderProducts(product_list, latestProducts);
renderProducts(best_product_list, bestProducts);

document.addEventListener("DOMContentLoaded", function () {
  const headerWrapper = document.querySelector(".header-wrapper");
  const openBtn = document.querySelector(".mb-menu-toggle");
  const closeBtn = document.querySelector(".mb-menu-close");

  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");
  const openCartLink = document.getElementById("open-cart-link");

  const openMenu = () => {
    headerWrapper.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    headerWrapper.classList.remove("active");
    document.body.style.overflow = "";
  };

  openBtn && openBtn.addEventListener("click", openMenu);
  closeBtn && closeBtn.addEventListener("click", closeMenu);

  document.querySelectorAll(".main-menu a, .user-menu a").forEach((a) => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 1279) closeMenu();
    });
  });

  const openCart = () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  };
  const closeCart = () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  };

  openCartLink &&
    openCartLink.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
      closeMenu();
    });

  document.querySelectorAll(".bx-cart").forEach((icon) => {
    const a = icon.closest("a");
    a &&
      a.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
      });
  });

  document.getElementById("close-cart")?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeCart();
    }
  });
});

document.querySelectorAll(".mega-dropdown > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 1279) {
      e.preventDefault();
      this.parentElement.classList.toggle("open");
    }
  });
});
