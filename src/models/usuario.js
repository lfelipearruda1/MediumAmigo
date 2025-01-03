import Sequelize, { Model } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Nome precisa ter entre 3 e 255 caracteres.',
            },
          },
        },
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Sobrenome precisa ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail já existe',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido.',
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'Idade precisa ser um número inteiro.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'usuarios',
        timestamps: true,
        underscored: true,
      }
    );

    this.addHook('beforeCreate', (usuario) => {
      if (usuario.email) {
        usuario.email = usuario.email.toLowerCase();
      }
    });
    this.addHook('beforeUpdate', (usuario) => {
      if (usuario.email) {
        usuario.email = usuario.email.toLowerCase();
      }
    });
    
    return this;
  }
}
