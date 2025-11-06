import { type Request, type Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}
export declare const getUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=userController.d.ts.map