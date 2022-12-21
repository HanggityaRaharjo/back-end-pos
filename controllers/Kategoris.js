import Kategori from '../models/KategoriModel.js';

export const getKategoris = async (req, res) => {
  try {
    const response = await Kategori.findAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({ where: { uuid: req.params.id } });
    if (!response) return res.status(404).json({ msg: 'Kategori tidak ditemukan' });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const createKategori = async (req, res) => {
  const { nama } = req.body;
  try {
    await Kategori.create({
      nama: nama,
    });
    return res.status(201).json({ msg: `Kategori ${nama} berhasil dibuat` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const updateKategori = async (req, res) => {
  const { nama } = req.body;
  const kategori = await Kategori.findOne({ where: { uuid: req.params.id } });
  if (!kategori) return res.status(404).json({ msg: 'Kategori tidak ditemukan' });
  try {
    await Kategori.update(
      { nama: nama },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    return res.status(200).json({ msg: `Kategori ${nama} berhasil diupdate` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deleteKategori = async (req, res) => {
  console.log(req.params.id);
  const kategori = await Kategori.findOne({ where: { uuid: req.params.id } });
  if (!kategori) return res.status(404).json({ msg: ' Nama kategori tidak ditemukan' });
  try {
    await Kategori.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    return res.status(200).json({ msg: `${kategori.nama} berhasil di hapus` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
