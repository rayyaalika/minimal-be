const db = require("../models");
const tbl_Users = db.tbl_users;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const LoginUser = async (req, res) => {
    let id_user
    let namaDepan_user
    let namaBelakang_user
    let email_user

    try {
        const user = await tbl_Users.findOne({
            where: {
                email_user: req.body.email,
            },
        });

        if (!user) {
            return res.status(422).json({ status: 'error', message: "Akun Anda tidak terdaftar!" });
        }

        const match = await bcrypt.compare(
            req.body.password,
            user.password_user
        );

        if (!match) {
            return res.status(422).json({ status: 'error', message: "Password Anda salah" });
        }

        if (user.refresh_token !== null) {
            return res.status(422).json({ status: 'error', message: "Akun sudah masuk di perangkat lain" });
        }

        id_user = user.id_user
        namaDepan_user = user.namaDepan_user
        namaBelakang_user = user.namaBelakang_user
        email_user = user.email_user

        const token_refresh = jwt.sign(
            {
                id_user,
                namaDepan_user,
                namaBelakang_user,
                email_user,
            }, process.env.KEY_REFRESH_SECRET, { expiresIn: '1d' }
        );

        await tbl_Users.update({ refresh_token: token_refresh }, {
            where: {
                id_user: id_user,
            },
        });

        res.status(200).json({ message: "Login Berhasil", token_refresh });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

const logOut = async (req, res) => {
    
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || token === '') {
        return res.status(401).json({
            message: "Akun Belum Login!",
        });
    }

    const user = await tbl_Users.findOne({
        where: {
            refresh_token: token,
        },
    });

    if (!user) {
        return res.status(422).json({
            message: "Users telah logout",
        });
    }

    await tbl_Users.update({ refresh_token: null }, {
        where: {
            id_user: user.id_user,
        },
    });

    res.status(200).json({
        message: "User telah berhasil logout",
    });
};

const refreshToken = async (req, res) => {
    
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Akun Belum Login!",
        });
    }

    try {
        const user = await tbl_Users.findOne({
            where: {
                refresh_token: token
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User telah logout",
            });
        }

        jwt.verify(token, process.env.KEY_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            };

            id_user = user.id_user
            namaDepan_user = user.namaDepan_user
            namaBelakang_user = user.namaBelakang_user
            email_user = user.email_user
    
            const token = jwt.sign(
                {
                    id_user,
                    namaDepan_user,
                    namaBelakang_user,
                    email_user,
                }, process.env.KEY_SECRET, { expiresIn: '15s' }
            );

            res.status(200).json({ token });
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            success: false,
            message: "internal server error",
            data: null,
        });
    }
};

module.exports = {
    LoginUser,
    logOut,
    refreshToken
};