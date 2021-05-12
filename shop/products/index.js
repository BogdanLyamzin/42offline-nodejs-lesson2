const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const productsPath = path.join(__dirname, "products.json");

const writeProducts = (products) => {
  const data = JSON.stringify(products);
  fs.writeFile(productsPath, data);
};

const getAllProducts = async () => {
  try {
    const data = await fs.readFile(productsPath);
    const products = JSON.parse(data);
    return products;
  } catch (error) {
    error.message = "Не удалось считать файл";
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const products = await getAllProducts();
    const product = products.find(({ _id }) => _id === id);
    return product;
    // if(product){
    //     return {
    //         status: "success",
    //         data: product
    //     }
    // }
    // return {
    //     status: "error",
    //     message: "Не удалось найти товар"
    // }
  } catch (error) {
    throw error;
  }
};

const addProduct = async (newProduct) => {
  try {
    const products = await getAllProducts();
    newProduct._id = v4();
    products.push(newProduct);
    writeProducts(products);
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, updateProduct) => {
  try {
    const products = await getAllProducts();
    const product = products.find(({ _id }) => _id === id);
    product = { ...updateProduct, _id: id };
    /*
    const index = products.findIndex(({_id}) => _id === id);
    products[index] = {...updateProduct, _id: id};
    */
    writeProducts(products);
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const products = await getAllProducts();
    //   const index = products.findIndex(({_id}) => _id === id);
    //   products.splice(index, 1);
    const newProducts = products.filter(({ _id }) => _id !== id);
    writeProducts(newProducts);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
