import db from '../database/dbConfig.js';

class SubmitQueries {
    static create = async (queryData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO submit_queries (
                    full_name, 
                    phone_number, 
                    message, 
                    attachment_url
                ) VALUES (?, ?, ?, ?)
            `;

            const values = [
                queryData.full_name,
                queryData.phone_number,
                queryData.message,
                queryData.attachment_url || null
            ];

            db.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error inserting submit query:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
    
    static findAll = async () => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM submit_queries ORDER BY submission_date DESC
        `;
            db.query(query, (error, result) => {
                if (error) {
                    console.error('Error fetching queries:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
}

export default SubmitQueries;
