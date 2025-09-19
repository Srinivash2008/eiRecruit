// src/controllers/jobApplicationController.js
import JobApplications from '../models/jobApplicationModel.js';

export const submitApplicationController = async (req, res) => {
    const newSubmittedData = req.body;
    try {

        const requiredNewSubmitApplicationFields = [
            "name",
            "position"
        ];

        const missingFields = requiredNewSubmitApplicationFields.filter(field => newSubmittedData[field] === undefined || newSubmittedData[field] === null || newSubmittedData[field] === '');
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const result = await JobApplications.create(newSubmittedData);

        if (result.success) {
            console.log(result.result, "result.result")
            return res.status(201).json({
                success: true,
                message: "Application submitted successfully!",
                id: result.result.insertId
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to submit application."
            });
        }
    } catch (error) {
        console.error('Error in submitApplication:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const fetchApplicationsController = async (req, res) => {
    try {
        const applications = await JobApplications.findAll();

        if (applications.success) {
            return res.status(200).json({
                success: true,
                message: "Applications retrieved successfully",
                result: applications.result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve applications"
            });
        }
    } catch (error) {
        console.error('Error in fetchApplications:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
