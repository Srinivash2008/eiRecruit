// src/models/jobApplicationModel.js
import db from '../database/dbConfig.js';

class JobSeeker {
    
    static findAll = async () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM job_seeker_list ORDER BY submitted_date DESC
            `;
            db.query(query, (error, result) => {
                if (error) {
                    console.error('Error fetching Job Seeker:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
}

export default JobSeeker;