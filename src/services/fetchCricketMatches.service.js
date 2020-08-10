const handleError = response => {
    if(response.status === 404) {
        return Promise.reject(new Error('Invalid URL..'));
    } else if(response.status === 500) {
        return Promise.reject(new Error('Some internal error occurred..'));
    } else if(response.status === 401) {
        return Promise.reject(new Error('UnAuthorized User..'));
    }
    return Promise.reject(new Error('Generic Error..'));
}

const apiKey='92efee334aa40730c80e395b57d1dd04';

async function authenticateUser(userName, password) {
    const credentials = { userId: userName, userPassword:password };
    try {
        const response = await fetch('http://localhost:8765/user-service/api/v1/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(credentials)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerUser(userName, password,firstName,lastName) {
    const credentials = { userId: userName, userPassword:password,firstName,lastName };
    try {
        const response = await fetch('http://localhost:8765/user-service/api/v1/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(credentials)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = {};
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { registerUser,authenticateUser, handleError, apiKey };