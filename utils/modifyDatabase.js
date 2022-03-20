const fs = require('fs/promises');

//Read and parse the json file
const readData = async (filePath) => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

//Write new videolist into json file
const saveData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

//Find an item in an array by id
const findById = async (filePath, id) => {
  const dataArray = await readData(filePath);
  const foundItem = dataArray.find((item) => item.id === id);
  return foundItem;
};

//Find an item in array and update it
const findByIdAndUpdate = async (filePath, id, data) => {
  //First check if the item actually exists
  const dataArray = await readData(filePath);
  let foundItemIndex = dataArray.findIndex((item) => item.id === id);
  if (foundItemIndex < 0) return false;
  //If item exists, then spread the values into a new object
  dataArray[foundItemIndex] = { ...data };
  //Insert the new edited object into the database
  await saveData(filePath, dataArray);
  return dataArray;
};

//Find an item in array and delete it
const findByIdAndDelete = async (filePath, id, targetId = 'id') => {
  //First check if the item actually exists
  const dataArray = await readData(filePath);
  const foundItem = dataArray.find((item) => item[targetId] === id);
  if (!foundItem) return false;
  //If there is an item with same id, then remove it with filter
  const updatedArray = dataArray.filter((item) => item[targetId] !== id);
  await saveData(filePath, updatedArray);
  return updatedArray;
};

//Insert item into an array
const insertInto = async (filePath, data) => {
  const dataArray = await readData(filePath);
  dataArray.push(data);
  await saveData(filePath, dataArray);
  return dataArray;
};

//Sorting list function
const sortBy = (key, order = 'asc') => {
  return (a, b) => {
    const getValue = (object, keys) => {
      return keys.split('.').reduce((o, k) => o?.[k], object);
    };
    const firstValue = getValue(a, key);
    const secondValue = getValue(b, key);
    if (order === 'desc') return firstValue > secondValue ? -1 : +1;
    return firstValue > secondValue ? +1 : -1;
  };
};

module.exports = {
  readData,
  saveData,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  insertInto,
  sortBy,
};
