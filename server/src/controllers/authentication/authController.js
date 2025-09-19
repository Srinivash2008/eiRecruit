import Employee from "../../models/employeeModel.js";
import { comparePassword, generateToken } from "../../utils/authHelpers.js";

export const loginController = async (req, res) => {
    const { emp_id, password } = req.body;

    if (!emp_id || !password) {
        return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    try {
        const user = await Employee.findByEmployeeId(emp_id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Employee ID or Password" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Employee ID or Password" });
        }

        const token = generateToken({
            employee_pid: user.employee_pid,
            employee_id: user.employee_id,
            role: user.role
        });

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                employee_id: user.employee_id,
                employee_name: user.employee_name,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
