import { API_CONFIG } from "../config/config";

class AuthService {
    async Registration(userData) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTHENTICATION.REGISTRATION}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error(`${response.status}`);
            return await response.json();
        }
        catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export const authService = new AuthService();