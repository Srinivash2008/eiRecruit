// src/models/jobApplicationModel.js
import db from '../database/dbConfig.js';

class JobSeeker {

    static findAll = async () => {
        return new Promise((resolve, reject) => {
            const query = `
              SELECT 
                job_seeker_list.id,
                job_seeker_list.name,
                job_seeker_list.email,
                job_seeker_list.contact_number,
                job_seeker_list.resume,
                job_seeker_list.message,
                job_seeker_list.submitted_date,
                current_opening.name AS opening_name
            FROM job_seeker_list
            JOIN current_opening 
                ON job_seeker_list.current_opening_id = current_opening.id
            ORDER BY job_seeker_list.submitted_date DESC;
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

    static create = async (data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO job_seeker_list (
                    name, 
                    email, 
                    contact_number, 
                    resume, 
                    message, 
                    current_opening_id
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;
            const values = [
                data.name,
                data.email,
                data.contact_number,
                data.resume,
                data.message,
                data.job_id
            ];
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error creating Job Seeker:', error);
                    return reject({ error: error, success: false, affectedData: null });
                }
                resolve({ result: result, success: true, affectedData: data });
            });
        });
    };
}

export default JobSeeker;