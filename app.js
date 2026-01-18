const form = document.getElementById("store-form");
const previewTitle = document.getElementById("preview-title");
const previewTagline = document.getElementById("preview-tagline");
const previewCategory = document.getElementById("preview-category");
const previewShipping = document.getElementById("preview-shipping");
const previewDiscount = document.getElementById("preview-discount");
const previewHero = document.getElementById("preview-hero");
const previewProducts = document.getElementById("preview-products");
const addProductButton = document.getElementById("add-product");
const downloadButton = document.getElementById("download-config");
const resetButton = document.getElementById("reset");
const productCardTemplate = document.getElementById("product-card-template");

const state = {
  storeName: "Efsane Sepet",
  category: "Moda",
  themeColor: "#5b7cfa",
  tagline: "Her bütçeye uygun",
  shipping: 2,
  discount: 10,
  products: [
    { name: "Keten ceket", price: 799, stock: 24 },
    { name: "Minimal sneaker", price: 1249, stock: 12 },
  ],
};

const updatePreview = () => {
  previewTitle.textContent = state.storeName || "Mağaza adını gir";
  previewTagline.textContent = state.tagline || "Kısa bir slogan ekle";
  previewCategory.textContent = state.category;
  previewShipping.textContent = `${state.shipping} gün`;
  previewDiscount.textContent = `%${state.discount}`;
  previewHero.style.background = `linear-gradient(135deg, ${state.themeColor}20, ${state.themeColor}40)`;

  previewProducts.innerHTML = "";
  state.products.forEach((product) => {
    const card = productCardTemplate.content.cloneNode(true);
    card.querySelector(".product-title").textContent = product.name;
    card.querySelector(
      ".product-meta"
    ).textContent = `${product.stock} adet stok • ${state.category}`;
    card.querySelector(".product-price").textContent = `₺${product.price}`;
    previewProducts.appendChild(card);
  });
};

const updateStateFromForm = () => {
  const data = new FormData(form);
  state.storeName = data.get("storeName") || state.storeName;
  state.category = data.get("category") || state.category;
  state.themeColor = data.get("themeColor") || state.themeColor;
  state.tagline = data.get("tagline") || state.tagline;
  state.shipping = Number(data.get("shipping")) || state.shipping;
  state.discount = Number(data.get("discount")) || state.discount;
};

const addProduct = () => {
  const data = new FormData(form);
  const name = data.get("productName");
  const price = Number(data.get("price"));
  const stock = Number(data.get("stock"));

  if (!name || !price || !stock) {
    return;
  }

  state.products.unshift({ name, price, stock });
  form.reset();
  form.elements.themeColor.value = state.themeColor;
  form.elements.category.value = state.category;
  updatePreview();
};

const downloadPlan = () => {
  const payload = {
    store: {
      name: state.storeName,
      category: state.category,
      tagline: state.tagline,
      themeColor: state.themeColor,
    },
    logistics: {
      shippingDays: state.shipping,
      discountPercent: state.discount,
    },
    products: state.products,
    nextSteps: [
      "Ödeme altyapısını bağla",
      "Kargo anlaşmalarını tamamla",
      "İade politikasını ekle",
    ],
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${state.storeName.replace(/\s+/g, "-").toLowerCase()}-plan.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const resetBuilder = () => {
  form.reset();
  state.storeName = "Efsane Sepet";
  state.category = "Moda";
  state.themeColor = "#5b7cfa";
  state.tagline = "Her bütçeye uygun";
  state.shipping = 2;
  state.discount = 10;
  state.products = [
    { name: "Keten ceket", price: 799, stock: 24 },
    { name: "Minimal sneaker", price: 1249, stock: 12 },
  ];
  form.elements.themeColor.value = state.themeColor;
  form.elements.category.value = state.category;
  updatePreview();
};

form.addEventListener("input", () => {
  updateStateFromForm();
  updatePreview();
});

addProductButton.addEventListener("click", addProduct);

previewProducts.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card) return;
  card.classList.toggle("selected");
});

downloadButton.addEventListener("click", downloadPlan);
resetButton.addEventListener("click", resetBuilder);

updatePreview();
