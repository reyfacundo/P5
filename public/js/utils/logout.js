export const logout = async ()=>{
    try {
        await axios.post('/users/logout', {}, { withCredentials: true });
        window.location.href = '/';
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
