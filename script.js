const products = [
  {
    id: 1,
    name: "Multi-purpose Broom",
    price: "R45",
    description: "Durable broom perfect for sweeping all types of floors.",
    images: ["images/broom.png", "images/broom2.png", "images/broom3.png"]
  },
  {
    id: 2,
    name: "Cleaning Pine Gel",
    price: "R35",
    description: "Powerful cleaning pine gel for fresh and hygienic floors.",
    images: ["images/pinegel.jpg", "images/pinegel2.jpg"]
  },
  {
    id: 3,
    name: "Work Shoes",
    price: "R150",
    description: "Comfortable and sturdy shoes ideal for work environments.",
    images: ["images/shoes.jpg", "images/shoes2.jpg", "images/shoes3.jpg"]
  },
  {
    id: 4,
    name: "Mop with Handle",
    price: "R75",
    description: "Efficient mop with a long handle for easy cleaning.",
    images: ["images/mop.jpg", "images/mop2.jpg"]
  },
  {
    id: 5,
    name: "Cotton Cloth",
    price: "R20",
    description: "Soft and absorbent cotton cloth for multiple uses.",
    images: ["images/Cotton Cloth.webp", "images/cloth2.webp"]
  },
  {
    id: 6,
    name: "Gas Burner",
    description: "Portable, efficient gas burner for home and outdoor use.",
    price: "R350",
    images: [
      "images/burner.jpg",
      "images/burner.jpg"
    ]
  }
];

const productListEl = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");

const modalProductName = document.getElementById("modalProductName");
const modalMainImage = document.getElementById("modalMainImage");
const modalImageGallery = document.getElementById("modalImageGallery");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

const purchaseForm = document.getElementById("purchaseForm");

// Render products on landing page
function renderProducts(filteredProducts = products) {
  productListEl.innerHTML = "";

  if (filteredProducts.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button data-id="${product.id}">VIEW PRODUCT</button>
    `;

    productListEl.appendChild(card);
  });

  // Add click listener to VIEW PRODUCT buttons
  document.querySelectorAll(".product-card button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      openProductModal(id);
    });
  });
}

// Open product modal and populate info
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  modalProductName.textContent = product.name;
  modalMainImage.src = product.images[0];
  modalMainImage.alt = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = `Price: ${product.price}`;

  // Clear gallery
  modalImageGallery.innerHTML = "";
  product.images.forEach((img, idx) => {
    const imgEl = document.createElement("img");
    imgEl.src = img;
    imgEl.alt = product.name + ` image ${idx + 1}`;
    imgEl.className = idx === 0 ? "active" : "";
    imgEl.addEventListener("click", () => {
      modalMainImage.src = img;
      document.querySelectorAll("#modalImageGallery img").forEach(i => i.classList.remove("active"));
      imgEl.classList.add("active");
    });
    modalImageGallery.appendChild(imgEl);
  });

  // Reset form
  purchaseForm.reset();
  modal.classList.remove("hidden");

  // Set current product id for form submit
  purchaseForm.setAttribute("data-product-id", productId);
}

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Purchase form submit handler
purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productId = parseInt(purchaseForm.getAttribute("data-product-id"));
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const location = document.getElementById("location").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !address || !location || !phone) {
    alert("Please fill in all the required fields.");
    return;
  }

  const message =
    `Hello, I would like to order the following product:\n` +
    `Product: ${product.name}\n` +
    `Price: ${product.price}\n\n` +
    `Buyer Details:\n` +
    `Name: ${name}\n` +
    `Address: ${address}\n` +
    `Location: ${location}\n` +
    `Phone: ${phone}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "27817134203"; // Your WhatsApp number, country code no plus

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
});

// Search functionality
searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

// Initial render
renderProducts();
