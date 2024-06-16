$(document).ready(() => {
    const token = localStorage.getItem('jwt_token');
    if(!token){
        alert('User not logged in, redirecting to login');
        window.location.href='#login';
    }
    // making call to backend to check JWT token against DB
    $.ajax({
        url:'rest/routes/User/verifyJWT.php',
        method: 'POST',
        headers: {'TOKEN': token},
        success: function(data){
            console.log('Successful verification of token');
        },
        error: () => {
            alert('Invalid token');
            window.location.href='#login';
            localStorage.removeItem('jwt_token');
        }
    });
});