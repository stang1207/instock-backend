//Enums for category field
const categoriesENUMS = {
  1: 'Electronics',
  2: 'Television',
};

//Check if the object is valid
const validateInventoryItem = (obj) => {
  if (
    !obj.warehouseID.trim() ||
    !obj.warehouseName.trim() ||
    !obj.itemName.trim() ||
    !obj.description.trim() ||
    Number(obj.quantity) < 0 ||
    !Object.values(categoriesENUMS).some((val) => val === obj.category)
  ) {
    return false;
  }
  return true;
};

module.exports = { validateInventoryItem };
