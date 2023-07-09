const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');

const getAllUsersController = async(req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'Users Data List',
            data: users,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching users',
            error,
        })
        
    }
}

const getAllDoctorsController = async(req,res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success: true,
            message: 'Doctors Data List',
            data: doctors,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching doctors',
            error,
        })
        
    }
}
//doctor account status
const changeAccountStatusController = async(req,res) =>{
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status});
        const user = await userModel.findOne({_id:doctor.userId});
        const notification = user.notification;
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Account Request has been ${status}`,
            onclickPath: '/notification'

        })
        user.isDoctor = status === 'approved' ? true : false
        await user.save();
        res.status(201).send({
            success: true,
            message: 'Account updated successfully',
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in change account status',
            error

        });
    }

}
module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController

}