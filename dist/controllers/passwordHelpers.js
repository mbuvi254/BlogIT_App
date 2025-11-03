import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
// Password Hash helper function
export async function hashPassword(plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    return hashedPassword;
}
//Verify
export async function comparePassword(password, dbPassword) {
    try {
        const hashedPassword = dbPassword;
        const plainPassword = password;
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if (isMatch) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
}
;
// Password Checker
export const checkPasswordStrength = async (password) => {
    try {
        const result = zxcvbn(password);
        console.log("Password Strength:", result.score);
        if (result.score < 3) {
            console.log("Please select a stronger password");
        }
        return result;
    }
    catch (error) {
        console.error("Error password checker:", error);
    }
};
//# sourceMappingURL=passwordHelpers.js.map