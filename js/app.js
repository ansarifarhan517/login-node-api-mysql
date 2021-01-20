const CONSTANTS = {
    APP_URL: 'http://127.0.0.1:5500/',
    API_URL: 'http://localhost:3000/api/',
    LOCAL_STORAGE_KEY: 'NODE_JWT_APP'
}

function isAuthorized() {
    const user = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
    if (!user) {
        location.href = `${CONSTANTS.APP_URL}login.html`;

    } else {
        $.ajax({
            type: 'POST',
            url: `${CONSTANTS.API_URL}account/authorized`,
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            success: () => {
                // location.href = `${CONSTANTS.APP_URL}dashboard.html`;
                $('body').removeClass('d-none');
            },
            error: (error) => {
                if (error.status === 401) {
                    location.href = `${CONSTANTS.APP_URL}login.html`;
                } else {
                    alert('Something when wrong');
                }
            }
        });
    }

}

function logout() {
    localStorage.clear();
    location.href = `${CONSTANTS.APP_URL}login.html`;
}

function getToken() {
    const user = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
    return user ? user.token : '';
}