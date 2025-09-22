import SubmitQueries from '../models/submitQueriesModel.js';
import { sendEmail } from '../utils/emailSender.js';

export const submitQueryController = async (req, res) => {
    const newQueryData = req.body;
    const file = req.file;
    // console.log(newQueryData,"newQueryData")
    // console.log(req.file.path,"req.file")

    try {
        // Handle file if uploaded
        if (file) {
            newQueryData.attachment_url = `http://${req.headers.host}/api/v1/uploads/submitQueriesFolder/${file.filename}`;
        }
        

        // Required fields validation
        const requiredFields = ["full_name", "phone_number", "message"];
        const missingFields = requiredFields.filter(
            field => !newQueryData[field] || newQueryData[field].trim() === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const result = await SubmitQueries.create(newQueryData);

        if (result.success && result.result.affectedRows > 0) {
             const emailHtml = `
                <h3>New Query Submitted</h3>
                <p><strong>Name:</strong> ${newQueryData.full_name}</p>
                <p><strong>Phone:</strong> ${newQueryData.phone_number}</p>
                <p><strong>Message:</strong> ${newQueryData.message}</p>
                ${file ? `<p><strong>Attachment:</strong> <a href="${newQueryData.attachment_url}">Download</a></p>` : ''}
            `;
            await sendEmail('silambarasan@pdmrindia.com', 'New Query Received', emailHtml);

            return res.status(201).json({
                success: true,
                message: "Query submitted successfully!",
                id: result.result.insertId
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to submit query."
            });
        }
    } catch (error) {
        console.error("Error in submitQueryController:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const fetchQueriesController = async (req, res) => {
    try {
        const queries = await SubmitQueries.findAll();

        if (queries.success) {
            return res.status(200).json({
                success: true,
                message: "Queries retrieved successfully",
                result: queries.result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve queries"
            });
        }
    } catch (error) {
        console.error('Error in fetchQueries:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
