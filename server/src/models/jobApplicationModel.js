// src/models/jobApplicationModel.js
import db from '../database/dbConfig.js';

class JobApplications {
    static create = async (applicationData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO job_applications (
                    name, 
                    position, 
                    current_place_of_stay, 
                    preferred_country_to_apply
                ) VALUES (?, ?, ?, ?)
            `;

            const applicationValues = [
                applicationData.name,
                applicationData.position,
                applicationData.current_place_of_stay,
                applicationData.preferred_country_to_apply
            ];

            db.query(query, applicationValues, (error, result) => {
                if (error) {
                    console.error('Error inserting job application:', error);
                    return reject({ error: error, success: false });
                }
               
                resolve({ result: result, success: true });
            });
        });
    };

    static findAll = async () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM job_applications ORDER BY submission_date DESC
            `;
            db.query(query, (error, result) => {
                if (error) {
                    console.error('Error fetching job applications:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
}

export default JobApplications;
