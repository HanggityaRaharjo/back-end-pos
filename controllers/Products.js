import Product from '../models/ProductModel.js';
import Kategori from '../models/KategoriModel.js';
import path from 'path';
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({ attributes: ['uuid', 'nama', 'harga', 'stok', 'img', 'url'], include: { all: true, attributes: ['nama'] } });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({ attributes: ['uuid', 'nama', 'harga', 'stok'], where: { uuid: req.params.id }, include: { all: true, attributes: ['nama'] } });
    if (!response) return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const createProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: 'Tidak ada file yang di upload' });
  const { nama, harga, stok, kategoriId } = req.body;
  const file = req.files.file;
  const fileSize = req.files.file;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', 'jpeg'];
  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Gambar tidak sesuai' });
  if (fileSize > 5000000) return res.status(422).json({ msg: 'Gambar harus dibawah 5 MB' });
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });
  try {
    await Product.create({
      nama: nama,
      img: fileName,
      url: url,
      harga: harga,
      stok: stok,
      kategoriId: kategoriId,
    });
    res.status(201).json({ msg: 'Produk berhasil dibuat' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateProduct = async (req, res) => {
  const product = await Product.findOne({ where: { uuid: req.params.id } });
  if (!product) return res.status(404).json({ msg: 'Produk tidak ditemukan' });
  const { nama, harga, stok, kategoriId } = req.body;

  let fileName;
  if (req.files === null) {
    fileName = product.img;
  } else {
    const file = req.files.file;
    const fileSize = req.files.file;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', 'jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Gambar tidak sesuai' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Gambar harus dibawah 5 MB' });
    const filepath = `./public/images/${product.img}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  try {
    await Product.update(
      { nama: nama, img: fileName, url: url, harga: harga, stok: stok, kategoriId: kategoriId },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: `${product.nama} berhasil diupdate` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ where: { uuid: req.params.id } });
  if (!product) return res.status(404).json({ msg: 'Produk tidak ditemukan' });
  try {
    const filepath = `./public/images/${product.img}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: `${product.nama} berhasil di delete` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
