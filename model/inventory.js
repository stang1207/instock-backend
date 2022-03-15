//Enums for category field
const categoriesENUMS = {
  1: 'Electronics',
  2: 'Television',
};

//Check if the object is valid
const validateInventoryItem = (obj) => {
  const errors = [];

  if (!obj.warehouseID.trim()) {
    errors.push('warehouseID');
  }
  if (!obj.warehouseName.trim()) {
    errors.push('warehouse name');
  }
  if (!obj.itemName.trim()) {
    errors.push('item name');
  }
  if (!obj.description.trim()) {
    errors.push('description');
  }
  if (+obj.quantity < 0) {
    errors.push('quantity');
  }
  if (!Object.values(categoriesENUMS).some((val) => val === obj.category)) {
    errors.push('category');
  }

  if (
    !obj.warehouseID.trim() ||
    !obj.warehouseName.trim() ||
    !obj.itemName.trim() ||
    !obj.description.trim() ||
    Number(obj.quantity) < 0 ||
    !Object.values(categoriesENUMS).some((val) => val === obj.category)
  ) {
    return errors;
  }
  return null;
};

module.exports = { validateInventoryItem };
