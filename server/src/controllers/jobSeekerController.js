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

export const updateJobSeekerController = async (req, res) => {
    const updateApplicationData = req.body;
    const file = req.file;

    

    try {
        // Handle file upload
        if (file) {
            updateApplicationData.resume = `http://${req.headers.host}/api/v1/uploads/resumeFolder/${file.filename}`;
        }

        // Validate ID
        if (!updateApplicationData.id) {
            return res.status(400).json({
                success: false,
                message: "Missing required field: id",
            });
        }

        // Filter valid fields (exclude empty/null values)
        const validFields = Object.keys(updateApplicationData).filter((field) => {
            const value = updateApplicationData[field];
            if (value === null || value === undefined) return false;
            if (typeof value === "string" && value.trim() === "") return false;
            return true;
        });

        if (validFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update.",
            });
        }

        const combineDatas = {
            // updateApplicationData

        }
        
        // Run update in model
        const result = await JobSeekeer.update(updateApplicationData);

        if (result.success && result.result.affectedRows > 0) {
            const updatedData = {
                id: result.affectedData.id,
                name: result.affectedData.name,
                email: result.affectedData.email,
                contact_number: result.affectedData.contact_number,
                resume: result.affectedData.resume,
                message: result.affectedData.message,
                jobId: result.affectedData.jobId,
            };

            return res.status(200).json({
                success: true,
                message: "Job Seeker updated successfully!",
                result: updatedData,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to update Job Seeker.",
            });
        }
    } catch (error) {
        console.error("Error in updateJobSeekerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};