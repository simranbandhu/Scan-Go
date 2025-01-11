let productData = [
  {
    id: 1,
    productName: "Maggi",
    cost: 14,
    currency: "₹",
    quantity: 4,
  },
  {
    id: 2,
    productName: "Blue Ball Point Pen",
    cost: 10,
    currency: "₹",
    quantity: 10,
  },
  {
    id: 3,
    productName: "Black Ball Point Pen",
    cost: 10,
    currency: "₹",
    quantity: 4,
  },
  {
    id: 4,
    productName: "Almond Hair Oil",
    cost: 50,
    currency: "₹",
    quantity: 1,
  },
  {
    id: 5,
    productName: "Flax Seeds",
    cost: 100,
    currency: "₹",
    quantity: 1,
  },
  {
    id: 6,
    productName: "Classmate - A4 Size Register",
    cost: 60,
    currency: "₹",
    quantity: 2,
  },
];

// Function to update product quantity
export const updateProductQuantity = (id, newQuantity) => {
  productData = productData.map((product) => {
    if (product.id === id) {
      return { ...product, quantity: newQuantity }; // Update quantity
    }
    return product; // Keep other products unchanged
  });
};

// Function to remove a product by ID
export const removeProduct = (id) => {
  productData = productData.filter((product) => product.id !== id); // Remove product
  console.log(productData, "after removal");
};

// Export the productData array
export { productData };
