import JobSeekeer from '../models/jobSeekerModel.js';
export const fetchJobSeekerController = async (req, res) => {
    try {
        const applications = await JobSeekeer.findAll();

        if (applications.success) {
            return res.status(200).json({
                success: true,
                message: "Job Seeker retrieved successfully",
                result: applications.result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve Job Seeker"
            });
        }
    } catch (error) {
        console.error('Error in fetchJobSeeker:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const createJobSeekerController = async (req, res) => {
    const newApplicationData = req.body;
    const file = req.file;

    try {
        // Handle file if uploaded
        if (file) {
            newApplicationData.logo = `http://${req.headers.host}/api/v1/uploads/resumeFolder/${file.filename}`;
        }


        // Required fields validation
        const requiredFields = [
            "name",
            "email",
            "contact_number",
            "jobId"
        ];
        const missingFields = requiredFields.filter(
            field => !newApplicationData[field] || newApplicationData[field].trim() === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const insertedData = {
            name: newApplicationData.name,
            email: newApplicationData.email,
            contact_number: newApplicationData.contact_number,
            resume: newApplicationData.logo,
            message: newApplicationData.message,
            job_id: newApplicationData.jobId
        };

        const newApplication = await JobSeekeer.create(insertedData);
        if (newApplication) {
            return res.status(201).json({
                success: true,
                message: "Job Seeker created successfully",
                result: newApplication
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to create Job Seeker"
            });
        }
    } catch (error) {
        console.error('Error in createJobSeeker:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};