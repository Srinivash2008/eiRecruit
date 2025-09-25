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
            FROM current_opening 
            WHERE current_opening.status = 'Publish' AND current_opening.is_active = 'Active'
            ORDER BY current_opening.id DESC
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

    static findAllWithStatus = async () => {
        return new Promise((resolve, reject) => {
            const query = `
           SELECT 
            current_opening.id,
            current_opening.name,
            current_opening.description,
            current_opening.location,
            current_opening.logo,
            current_opening.status,
            current_opening.created_date,
            COUNT(job_seeker_list.id) AS job_seeker_count
        FROM current_opening
        LEFT JOIN job_seeker_list 
            ON current_opening.id = job_seeker_list.current_opening_id
        WHERE current_opening.is_active = 'Active'
        GROUP BY 
            current_opening.id
        ORDER BY current_opening.id DESC;
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

    static update = async (queryData) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE current_opening 
            SET name = ?, description = ?, location = ?, logo = ?
            WHERE id = ?
        `;
            const values = [
                queryData.name,
                queryData.description,
                queryData.location,
                queryData.logo || null,
                queryData.id
            ];
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error updating current opening:', error);
                    return reject({ error: error, success: false, affectedData: null });
                }

                resolve({ result: result, success: true, affectedData: queryData });
            });
        });
    };
    static softDelete = async (id) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE current_opening 
            SET is_active = 'InActive'
            WHERE id = ?
        `;
            db.query(query, [id], (error, result) => {
                if (error) {
                    console.error('Error soft deleting current opening:', error);
                    return reject({ error: error, success: false });
                }
                resolve({ result: result, success: true });
            });
        });
    };
}

export default CurrentJobOpenings;
