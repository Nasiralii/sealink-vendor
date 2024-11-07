export interface ApiResponse<T> {
    statusCode: string;
    message: string;
    data: T;
    errorInfo: null | string;
}

export interface UserInfo {
    uiContactId: string;
    vaCompanyName: string;
    vaVendorName: string;
    vaVendorCode: string;
    Email: string; // Consider using camelCase for consistency (email)
}

export interface VendorLoginResponse {
    tokenType: string;
    accessTokenExpirationTime: string;
    refreshTokenExpirationTime: string;
    userInfo: UserInfo[];
    accessToken: string;
    refreshToken: string;
}


