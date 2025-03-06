const db = require("../models");
const tbl_products = db.tbl_products;
const moment = require("moment-timezone");

const post_product = async (req, res) => {
  try {
    const currentDateTime = moment()
      .tz("Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");

    const { nama, kategori, harga } = req.body;

    const generateRandomCode = () => {
      return Math.floor(1000 + Math.random() * 900000000);
    };
    const kode_product = `ADM${generateRandomCode()}`;

    const data = await tbl_products.create({
      kode_products: kode_product,
      nama_products: nama,
      kategori_products: kategori,
      harga_products: harga,
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Data produk berhasil ditambahkan!",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
    });
  }
};

const get_product = async (req, res) => {
  try {
    const Products = await tbl_products.findAndCountAll();

    if (Products.count === 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Data produk kosong",
        data: [],
      });
    }

    const results = await Promise.all(
      Products.rows.map(async (products) => {
        return {
          id: products.id_products,
          kode: products.kode_products,
          name: products.nama_products,
          kategori: products.kategori_products,
          harga: products.harga_products,
          createdAt: products.updatedAt,
          updatedAt: products.updatedAt,
        };
      })
    );

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Data produk ditemukan",
      data: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
    });
  }
};

const put_product = async (req, res) => {
  try {
    const currentDateTime = moment()
      .tz("Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");

    const { id_products } = req.params;

    if (!id_products) {
      return res.status(404).send({ error: "id_products is required" });
    }

    const products_update = await tbl_products.findOne({
      where: {
        id_products,
      },
    });

    if (!products_update) {
      return res.status(422).json({
        status: "error",
        success: false,
        message: "Data produk tidak terdaftar",
      });
    }

    const { nama, kategori, harga } = req.body;

    const update_data = await products_update.update({
      nama_products: nama,
      kategori_products: kategori,
      harga_products: harga,
      updatedAt: currentDateTime,
    });

    if (!update_data) {
      return res.status(422).json({
        status: "error",
        success: false,
        message: "Data produk gagal dihapus",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data produk berhasil diperbarui",
      data: update_data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
    });
  }
};

const delete_product = async (req, res) => {
    try {
      const { id_products } = req.params;
  
      if (!id_products) {
        return res.status(400).send({ error: "id_products is required" });
      }
  
      const products_data_delete = await tbl_products.findOne({
        where: {
          id_products
        },
      });
  
      if (!products_data_delete) {
        return res.status(422).json({
          status: 'error',
          success: false,
          message: 'Data produk tidak terdaftar'
        });
      }
  
      const delete_product = await products_data_delete.destroy();
  
      if (!delete_product) {
        return res.status(422).json({
          status: 'error',
          success: false,
          message: "Data produk gagal dihapus",
        });
      }
  
      return res.status(200).json({
        status: 'success',
        success: true,
        message: "Data produk berhasil dihapus",
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
      });
    }
  
  };

module.exports = {
  post_product,
  get_product,
  put_product,
  delete_product
};
