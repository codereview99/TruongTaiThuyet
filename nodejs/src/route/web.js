
import express from "express";
import HomeControllers from "../controllers/HomeControllers";
import UserController from "../controllers/UserController";
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import cors from "cors"

let router= express.Router();

let initWebRoutes=(app)=>{
    router.get("/",HomeControllers.gethomePage)
    router.get("/crud",HomeControllers.getCRUD)
    router.post("/post-crud",HomeControllers.postCRUD)
    router.get("/get-crud",HomeControllers.displayGETCRUD)
    router.get("/edit-crud",HomeControllers.getEditCRUD)
    router.post("/put-crud",HomeControllers.putCRUD)
    router.get("/delete-crud",HomeControllers.deleteCRUD)

    router.post("/api/login",UserController.handleLogin)
    router.get("/api/get-all-users",UserController.handleGetAllUser)
    router.post("/api/create-new-users",UserController.handleCreateNewUser)
    router.put("/api/edit-users",UserController.handleEditUser)
    router.delete("/api/delete-users",UserController.handleDeleteUser)

    router.get("/api/allcode",UserController.getAllCode)

    router.get("/api/top-doctor-home",doctorController.getTopDoctorHome)
    router.get("/api/get-all-doctors",doctorController.getAllDoctors)
    router.post("/api/save-info-doctors",doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id',doctorController.getDetailDoctorById)

    router.post("/api/bulk-create-schedule",doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date',doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id',doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id',doctorController.getProfileDoctorById)

    router.get('/api/get-list-patient-for-doctor',doctorController.getListPatientForDoctor)
    router.post("/api/send-remedy",doctorController.sendRemedy)

    router.post("/api/patient-book-appoinment",patientController.postBookAppoinment)
    router.post("/api/verify-book-appoinment",patientController.postVerifyBookAppoinment)

    router.post("/api/create-new-specialty",specialtyController.createSpecialty)
    router.get("/api/get-specialty",specialtyController.getAllSpecialty)
    router.get("/api/get-detail-specialty-by-id",specialtyController.getDetailSpecialtyById)

    router.post("/api/create-new-clinic",clinicController.createClinic)
    router.get("/api/get-clinic",clinicController.getAllClinic)
    router.get("/api/get-detail-clinic-by-id",clinicController.getDetailClinicById)

    return app.use("/",router)
}
export default initWebRoutes