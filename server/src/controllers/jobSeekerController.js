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