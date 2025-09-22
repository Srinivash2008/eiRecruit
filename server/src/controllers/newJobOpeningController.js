import currentJobOpenings from "../models/newJobOpeningModel.js";



export const fetchOpeningController = async (req, res) => {
    try {
        const currentOpenings = await currentJobOpenings.findAll();


        if (currentOpenings.success) {
            return res.status(200).json({
                success: true,
                message: "opening retrieved successfully",
                result: currentOpenings.result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve openings"
            });
        }
    } catch (error) {
        console.error('Error in fetchOpeningController:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const createNewOpeningController = async (req, res) => {
    const newOpeningData = req.body;
    const file = req.file;
    // console.log(newQueryData,"newQueryData")
    // console.log(req.file.path,"req.file")

    try {
        // Handle file if uploaded
        if (file) {
            newOpeningData.logo = `http://${req.headers.host}/api/v1/uploads/logoFolder/${file.filename}`;
        }


        // Required fields validation
        const requiredFields = [
            "name",
            "description",
            "location"
        ];
        const missingFields = requiredFields.filter(
            field => !newOpeningData[field] || newOpeningData[field].trim() === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const result = await currentJobOpenings.create(newOpeningData);


        if (result.success && result.result.affectedRows > 0) {

            const newInsertedData = {
                id: result.result.insertId,
                // affectedData
                name: result.affectedData.name,
                description: result.affectedData.description,
                location: result.affectedData.location,
                logo: result.affectedData.logo,
                status: result.affectedData.status || 'Publish',
            };


            return res.status(201).json({
                success: true,
                message: "Query submitted successfully!",
                result: newInsertedData
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to submit query."
            });
        }
    } catch (error) {
        console.error("Error in createNewOpeningController:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const updateCurrentOpeningStatusController = async (req, res) => {
    const updatecurrentOpeningStatusData = req.body;

    try {


        // Validate required fields
        const validFields = Object.keys(updatecurrentOpeningStatusData).filter((field) => {
            const value = updatecurrentOpeningStatusData[field];

            if (value === null || value === undefined) return false;
            if (typeof value === "string" && value.trim() === "") return false;

            return true;
        });

        if (validFields.length === 0) {
            return res.status(400).json({ success: false, message: "No valid fields provided." });
        }

        const result = await currentJobOpenings.updateStatus(updatecurrentOpeningStatusData);


        if (result.success && result.result.affectedRows > 0) {

            const updatedData = {
                id: result.affectedData.id,
                status: result.affectedData.status,
            };


            return res.status(201).json({
                success: true,
                message: "update  successfully!",
                result: updatedData
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to update current opening."
            });
        }
    } catch (error) {
        console.error("Error in updateCurrentOpeningStatusController:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};