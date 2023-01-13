// import { useSelector } from 'react-redux';

export function useAuth() {
    // const token = useSelector((state) => state.profile.token);
    console.log(!!localStorage.getItem('token'));

    return {
        isAuth: !!localStorage.getItem('token')
    };
}
