//Enums for category field
const categoriesENUMS = {
  1: 'Electronics',
  2: 'Gear',
  3: 'Apparel',
  4: 'Accessories',
  5: 'Health',
};

//Check if the object is valid
const validateInventoryItem = (obj) => {
  const errors = [];

  if (!obj.warehouseID.trim()) {
    errors.push('Warehouse ID');
  }
  if (!obj.warehouseName.trim()) {
    errors.push('Warehouse name');
  }
  if (!obj.itemName.trim()) {
    errors.push('Item name');
  }
  if (!obj.description.trim()) {
    errors.push('Description');
  }
  if (!obj.quantity || typeof obj.quantity !== 'number' || +obj.quantity < 0) {
    errors.push('Quantity');
  }
  if (!Object.values(categoriesENUMS).some((val) => val === obj.category)) {
    errors.push('Category');
  }
  if (obj.status !== 'Out of Stock' && obj.status !== 'In Stock') {
    errors.push('Status');
  }

  //If there is error, return the array containing the error
  if (errors.length > 0) {
    return errors;
  }

  //If the objcet passed validation, do nothing and return null
  return null;
};

module.exports = { validateInventoryItem };
