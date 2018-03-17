import routeAuth from './auth';
import routeApi  from './api';


export default (app) => {

  routeAuth(app);
  routeApi(app);

}
