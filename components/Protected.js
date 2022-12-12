import { useRouter } from 'next/router';

export const Protected = ({ children }) => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    let isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      router.push({
        pathname: '/',
      });
    }
  }

  return children;
};
