import db from "../database/dbConfig.js";

class Employee {
  static findByEmployeeId = (empId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM employee_personal WHERE employee_id = ?",
        [empId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        }
      );
    });
  };
}

export default Employee;
