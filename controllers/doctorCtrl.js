const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async(req,res) => {

    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: 'Doctor data fetched successfully',
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Fetching Doctors Details'
        })
    }

}

//update doctor profile
const updateProfileController = async(req ,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({
            success: true,
            message: 'Doctor Profile updated successfully',
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Issue in updating Doctor Profile',
            error
        })
        
    }
}
//get single doctor
const getDoctorByIdController = async(req ,res) =>{
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId});
        res.status(200).send({
            success: true,
            message: 'Single Doctor info fetched successfully',
            data: doctor,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting single doctor information',
        })
        
    }
}

const doctorAppointmentsController = async(req,res) =>{
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        const appointments = await appointmentModel.find({
            doctorId: doctor._id
        });
        res.status(200).send({
            success: true,
            message: 'Doctor Appointment fetched successfully',
            data: appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting Doctor Appointments'
        })
        
    }

}
const  updateStatusController = async(req,res) =>{
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user = await userModel.findOne({ _id:appointments.userId})
        const notification = user.notification
        notification.push({
            type:'status-updated',
            message:`Your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Your appointment status has been updated',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Updating Status'
        })
    }
}
module.exports = {getDoctorInfoController,
     updateProfileController,
     getDoctorByIdController,
     doctorAppointmentsController,
     updateStatusController
    }