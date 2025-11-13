// Inventory Dashboard - JavaScript with Working Buttons

// Product data
const products = [
  { id: 1, name: 'Blue T-shirt', sku: 'BT-001', price: 299, stock: 24 },
  { id: 2, name: 'Wireless Mouse', sku: 'MOU-203', price: 899, stock: 6 },
  { id: 3, name: 'Ceramic Mug', sku: 'MUG-12', price: 199, stock: 120 },
  { id: 4, name: 'Phone Charger', sku: 'CHG-04', price: 399, stock: 0 },
  { id: 5, name: 'Spiral Notebook', sku: 'NB-99', price: 69, stock: 420 },
  { id: 6, name: 'Wireless Earbuds', sku: 'EB-66', price: 1599, stock: 14 }
];

// Image array mapping
const images = ['Blue shirts.webp', 'mouse.webp', 'mug.webp', 'charger.webp', 'spiral.webp', 'buds.webp'];

// Display products with action buttons
function displayProducts() {
  const grid = document.querySelector('.products-grid');
  grid.innerHTML = '';
  
  products.forEach(product => {
    const status = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'ok';
    const statusText = product.stock === 0 ? 'Out' : product.stock < 10 ? 'Low stock' : 'In stock';
    
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="meta">
        <div class="thumb"><img src="${images[product.id - 1]}" alt=""></div>
        <div style="flex:1">
          <div class="product-name">${product.name}</div>
          <div class="product-sku">SKU: ${product.sku}</div>
        </div>
        <div class="small muted">₹ ${product.price}</div>
      </div>
      <div class="stock">
        <div class="small muted">Available: <strong id="stock-${product.id}">${product.stock}</strong></div>
        <div class="badge ${status}" id="badge-${product.id}">${statusText}</div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button class="btn-add" onclick="addStock(${product.id})">➕ Add</button>
        <button class="btn-remove" onclick="removeStock(${product.id})">➖ Remove</button>
        <button class="btn-info" onclick="showInfo(${product.id})">ℹ️ Info</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Add stock button function
function addStock(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.stock += 5;
    updateDisplay(productId);
    showAlert(`✅ Added 5 units to ${product.name}`);
  }
}

// Remove stock button function
function removeStock(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    if (product.stock >= 5) {
      product.stock -= 5;
    } else {
      product.stock = 0;
    }
    updateDisplay(productId);
    showAlert(`✅ Removed units from ${product.name}`);
  }
}

// Show product info button
function showInfo(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    alert(`📦 Product Info\n\nName: ${product.name}\nSKU: ${product.sku}\nPrice: ₹${product.price}\nStock: ${product.stock} units\nTotal Value: ₹${product.price * product.stock}`);
  }
}

// Update display after stock change
function updateDisplay(productId) {
  const product = products.find(p => p.id === productId);
  const status = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'ok';
  const statusText = product.stock === 0 ? 'Out' : product.stock < 10 ? 'Low stock' : 'In stock';
  
  document.getElementById(`stock-${productId}`).textContent = product.stock;
  document.getElementById(`badge-${productId}`).className = `badge ${status}`;
  document.getElementById(`badge-${productId}`).textContent = statusText;
}

// Show alert notification
function showAlert(message) {
  const alert = document.createElement('div');
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease; `;
  alert.textContent = message;
  document.body.appendChild(alert);
  
  setTimeout(() => alert.remove(), 2500);
}

// Add CSS animation for alert
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .btn-add, .btn-remove, .btn-info {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
  }
  
  .btn-add {
    background: #4CAF50;
    color: white;
  }
  .btn-add:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
  
  .btn-remove {
    background: #f44336;
    color: white;
  }
  .btn-remove:hover {
    background: #da190b;
    transform: translateY(-2px);
  }
  
  .btn-info {
    background: #2196F3;
    color: white;
  }
  .btn-info:hover {
    background: #0b7dda;
    transform: translateY(-2px);
  }
`;
document.head.appendChild(style);

// Search functionality
function setupSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const grid = document.querySelector('.products-grid');
    grid.innerHTML = '';
    
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.sku.toLowerCase().includes(query)
    );
    
    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color: #999;">No products found</p>';
      return;
    }
    
    filtered.forEach(product => {
      const status = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'ok';
      const statusText = product.stock === 0 ? 'Out' : product.stock < 10 ? 'Low stock' : 'In stock';
      
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="meta">
          <div class="thumb"><img src="${images[product.id - 1]}" alt=""></div>
          <div style="flex:1">
            <div class="product-name">${product.name}</div>
            <div class="product-sku">SKU: ${product.sku}</div>
          </div>
          <div class="small muted">₹ ${product.price}</div>
        </div>
        <div class="stock">
          <div class="small muted">Available: <strong id="stock-${product.id}">${product.stock}</strong></div>
          <div class="badge ${status}" id="badge-${product.id}">${statusText}</div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="btn-add" onclick="addStock(${product.id})">➕ Add</button>
          <button class="btn-remove" onclick="removeStock(${product.id})">➖ Remove</button>
          <button class="btn-info" onclick="showInfo(${product.id})">ℹ️ Info</button>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  setupSearch();
});
