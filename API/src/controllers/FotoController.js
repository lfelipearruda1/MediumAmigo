import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      const { originalname, filename } = req.file;
      const { usuario_id } = req.body;
      const foto = await Foto.create({ originalname, filename, usuario_id});

      if (!usuario_id) {
        return res.status(400).json({
          errors: ['Usuário não informado'],
        });
      }

      try {
        const foto = await Foto.create({
          originalname,
          filename,
          usuario_id
        });

        return res.json(foto);
      } catch (err) {
        return res.status(500).json({
          errors: ['Erro ao salvar a foto'],
        });
      }
    });
  }
}

export default new FotoController();
