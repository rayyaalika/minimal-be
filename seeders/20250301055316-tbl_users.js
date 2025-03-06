'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('@demo1', 10);

    return queryInterface.bulkInsert('tbl_users', [
      {
        namaDepan_user: 'Demo',
        namaBelakang_user: 'Minimal',
        email_user: 'demo@minimals.cc',
        password_user: hashedPassword,
        createdAt: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tbl_users', null, {});
  }
};