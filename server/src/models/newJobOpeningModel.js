import db from '../database/dbConfig.js';

class CurrentJobOpenings {

    static create = async (queryData) => {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO current_opening (
                name,
                description,
                location,
                logo,
                status
            ) VALUES (?, ?, ?, ?, ?)
        `;

            const values = [
                queryData.name,
                queryData.description,
                queryData.location,
                queryData.logo || null,
                queryData.status || 'Publish'
            ];

            db.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error inserting new job opening query:', error);
                    return reject({ error: error, success: false, affectedData: null });
                }
                resolve({ result: result, success: true, affectedData: queryData });
            });
        });
    };


    static findAll = async () => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
            current_opening.id,
            current_opening.name,
            current_opening.description,
            current_opening.location,
            current_opening.logo,
            current_opening.status,
            current_opening.created_Date
            FROM current_opening ORDER BY id DESC
        `;
            db.query(query, (error, result) => {
                if (error) {
                    console.error('Error fetching current openings:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
    static updateStatus = async (queryData) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE current_opening 
            SET status = ?
            WHERE id = ?
        `;

            const values = [
                queryData.status,
                queryData.id
            ];

            db.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error updating current opening status:', error);
                    return reject({ error: error, success: false, affectedData: null });
                }
                resolve({ result: result, success: true, affectedData: queryData });
            });
        });
    };
}

export default CurrentJobOpenings;
