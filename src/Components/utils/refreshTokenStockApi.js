import localForage from 'localforage';
import { setUpCache } from 'axios-cache-adapter';

const cache = setupCache({
    maxAge: (3600 - 5 * 60) * 1000,
    store: localForage,
    exclude:{
        query: false
    }
});

export const refreshTokenStockApi = (res) => {
     
    };
  
    setTimeout(refreshToken, refreshTiming);
  };
  