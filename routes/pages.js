const Express = require("express");
const app = Express();
const axios = require('axios');
const Router = Express.Router();
const fs = require('fs');
const Dotenv = require("dotenv");
// Set Moment Format engine
const Moment = require("moment");
const { log } = require("console");
require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

Dotenv.config({ path: './.env' });
// const Connection = require ("../DBconnection");

/** Route for home */
Router.get('/', (req, res) => {
    res.send("Hello, welcome to API-DINKES-test Page")
})

/** Route for data rs covid */
Router.get('/datarscovid', (req, res) => {
    let res1 = res;
    url = process.env.COVID_URL;
    axios.get(url)
    .then(function (res) {
        var datacovid = res.data;
        res.json(datacovid)
    })
    .catch(function (err) {
        console.log(err);
    })
})

/** Route for write data rs covid */
Router.get('/writedatarscovid', (req, res) => {
    let res1 = res;
    url = process.env.COVID_URL;
    axios.get(url)
    .then(function (res) {
        var datacovid = res.data;
        /** convert data */
        var dataRSCovidJson = JSON.stringify(datacovid);

        /** write file */
        fs.writeFile('datarscovid.json', dataRSCovidJson, (err) => {
            if (err) {
                console.log("Gagal Membuat File Data RS Covid");
            } else {
                console.log("File RS Covid Berhasil Dibuat");
            }
        });
    })
    .catch(function (err) {
        console.log(err);
    })
})

/** route for rs */
Router.get('/datars', (req, res) => {
    let res1 = res;
    url = process.env.RS_URL;
    axios.get(url)
    .then(function (res) {
        var datars = res.data;
        res.json(datars);
    })
    .catch(function (err) {
    console.log(err);
    })
})

/** Route for write data rs */
Router.get('/writedatars', (req, res) => {
    let res1 = res;
    url = process.env.RS_URL;
    axios.get(url)
    .then(function (res) {
        var datars = res.data;
        /** convert data */
        var dataRSJson = JSON.stringify(datars);
        /** write file */
        fs.writeFile('datars.json', dataRSJson, (err) => {
            if (err) {
                console.log("Gagal Membuat File Data RS");
            } else {
                console.log("File RS Berhasil Dibuat");
            }
        });
    })
    .catch(function (err) {
        console.log(err);
    })
})

/** Route for join from written file */
Router.get('/joinwrittenfile', (req, res) => {
    try {
        /** read data RS */
        fs.readFile('datars.json', (err, dataRsFile) => {
            if (err) {
                console.log(err);
            }
            var dataRs = JSON.parse(dataRsFile);
            // console.log(dataRs);

            /** read data RS Covid */
            fs.readFile('datarscovid.json', (err, dataRsCovidFile) => {
                if (err) {
                    console.log(err);
                }
                var dataRsCovid = JSON.parse(dataRsCovidFile);
                // console.log(dataRsCovid);
                
                /** join data */
                var mergedAll = [];
                var mergedSatu = [];
                var mergedDua = [];
                var mergedTiga = [];
                var mergedEmpat = [];
                var mergedLima = [];
                var mergedEnam = [];
                var mergedTujuh = [];
                var mergedDelapan = [];

                for(var j in dataRs){
                    for (var i in dataRsCovid) {
                        /** get jenis RS = RSUD */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Umum Daerah") {
                            /** get character awal nama rs covid = RSUD */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0, 4) === "RSUD") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(5)) {
                                    mergedSatu.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Umum */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Umum") {
                            /** get character awal nama rs covid = RS */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0, 2) === "RS") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(3)) {
                                    mergedDua.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Khusus Jiwa */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Khusus Jiwa") {
                            /** get character awal nama rs covid = RSKD */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0, 4) === "RSKD") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(5)) {
                                    mergedTiga.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Umum Pusat Nasional */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Umum Pusat Nasional") {
                            /** get character awal nama rs covid = RSUPN */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0, 5) === "RSUPN") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(6)) {
                                    mergedEmpat.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Khusus Jantung dan Pembuluh Darah  */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Khusus Jantung dan Pembuluh Darah") {
                            /** get character awal nama rs covid = RS JANTUNG DAN PEMBULUH DARAH */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0, 29) === "RS JANTUNG DAN PEMBULUH DARAH") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(30)) {
                                    mergedLima.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Anak dan Bunda  */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Anak dan Bunda") {
                            /** get character awal nama rs covid = RS ANAK DAN BUNDA */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0,17) === "RS ANAK DAN BUNDA") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(18)) {
                                    mergedEnam.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Khusus Kanker  */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Khusus Kanker") {
                            /** get character awal nama rs covid = RS KHUSUS KANKER */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0,16) === "RS KHUSUS KANKER") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(17)) {
                                    mergedTujuh.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                        /** get jenis RS = Rumah Sakit Khusus Otak  */
                        if (dataRs[j].jenis_rumah_sakit === "Rumah Sakit Khusus Otak") {
                            /** get character awal nama rs covid = RS KHUSUS */
                            if (dataRsCovid[i].nama_rumah_sakit.substring(0,9) === "RS KHUSUS") {
                                /** cek jika nama rs dan nama rs di data rs covid sama */
                                var namaRSBesar = dataRs[j].nama_rumah_sakit.toUpperCase();
                                var namaRSCovidBesar = dataRsCovid[i].nama_rumah_sakit.toUpperCase();
                                if (namaRSBesar === namaRSCovidBesar.substring(10)) {
                                    mergedDelapan.push({ ...dataRsCovid[i], ...dataRs[j] })
                                }
                            }
                        }
                    }
                }

                /** merged all */
                mergedAll.push(...mergedSatu, ...mergedDua, ...mergedTiga, ...mergedEmpat, ...mergedLima, ...mergedEnam, ...mergedTujuh, ...mergedDelapan);
                // console.log(mergedAll);

                /** print out data */
                res.json(mergedAll)
                /** convert data */
                var datamerge = JSON.stringify(mergedAll);
                /** write file */
                fs.writeFile('datamerge.json', datamerge, (err) => {
                    if (err) {
                        console.log("Gagal Membuat File Data Merge");
                    } else {
                        console.log("File Data Merge Berhasil Dibuat");
                    }
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
})

Router.get('/orderbykelurahan', (req, res) => {
    try {
        /** read data RS Covid */
        fs.readFile('datamerge.json', (err, data) => {
            if (err) {
                console.log(err);
            }
            var data = JSON.parse(data);

            /** buat perbanding untuk sort */
            data.sort(function (a, b) {
                var textA = a.kelurahan;
                var textB = b.kelurahan;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            
            /** print out */
            res.json(data)

            /** convert data */
            var dataorder = JSON.stringify(data);

            /** write file */
            fs.writeFile('dataorder.json', dataorder, (err) => {
                if (err) {
                    console.log("Gagal Membuat File Data Order");
                } else {
                    console.log("File Data Order Berhasil Dibuat");
                }
            });
        })
    } catch (err) {
        console.log(err);
    }
});

Router.get('/orderbykecamatan', (req, res) => {
    try {
        /** read data RS Covid */
        fs.readFile('datamerge.json', (err, data) => {
            if (err) {
                console.log(err);
            }
            var data = JSON.parse(data);

            /** buat perbanding untuk sort */
            data.sort(function (a, b) {
                var textA = a.kecamatan;
                var textB = b.kecamatan;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            
            /** print out */
            res.json(data)

            /** convert data */
            var dataorder = JSON.stringify(data);

            /** write file */
            fs.writeFile('dataorder.json', dataorder, (err) => {
                if (err) {
                    console.log("Gagal Membuat File Data Order");
                } else {
                    console.log("File Data Order Berhasil Dibuat");
                }
            });
        })
    } catch (err) {
        console.log(err);
    }
});

module.exports = Router;