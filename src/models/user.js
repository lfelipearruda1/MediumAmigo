const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: 'Email já existe',
          },
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Email Inválido.',
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 e 50 caracteres.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = User;
