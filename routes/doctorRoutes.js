const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');
const router = express.Router();

//POST SINGLE DOCTOR INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//POST Update Profile
router.post('/updateProfile', authMiddleware, updateProfileController)

//POST GET SINGLE DOCTOR INFO
router.post('/getDoctorById', authMiddleware, getDoctorByIdController)

//GET APPPOINTMENTS
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController)

//POST UPDATE STATUS
router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router