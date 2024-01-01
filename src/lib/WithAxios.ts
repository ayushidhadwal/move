import {FC, ReactElement, useMemo} from 'react';
import {Axios} from './Axios';
import {useAppDispatch} from '../store';
import {logout} from '../store/auth/authSlice';

type Props = {
  children: ReactElement;
};

const WithAxios: FC<Props> = ({children}) => {
  const dispatch = useAppDispatch();
  useMemo(() => {
    Axios.interceptors.response.use(
      function (response: any) {
        return response;
      },
      async error => {
        if (error?.response?.status === 401) {
          // dispatch(logout());
        }
        // console.log(error.response);
        console.log(error.config.url);
        return Promise.reject(error.message);
      },
    );
  }, []);

  return children;
};

export default WithAxios;
