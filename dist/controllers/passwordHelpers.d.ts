import zxcvbn from "zxcvbn";
export declare function hashPassword(plainPassword: string): Promise<string>;
export declare function comparePassword(password: string, dbPassword: string): Promise<boolean | undefined>;
export declare const checkPasswordStrength: (password: string) => Promise<zxcvbn.ZXCVBNResult | undefined>;
//# sourceMappingURL=passwordHelpers.d.ts.map