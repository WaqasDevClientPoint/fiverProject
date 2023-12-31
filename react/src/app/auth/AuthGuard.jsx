// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import AppContext from "app/appContext";
// import GullLayout from "app/GullLayout/GullLayout";
// import { flatMap } from "lodash";
// class AuthGuard extends Component {
//   constructor(props, context) {
//     super(props);
//     let { routes } = context;

//     this.state = {
//       authenticated: true,
//       routes,
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       routes: flatMap(this.state.routes, (item) => {
//         if (item.routes) {
//           return [...item.routes];
//         }
//         return [item];
//       }),
//     });

//     if (!this.state.authenticated) {
//       this.redirectRoute(this.props);
//     }
//   }

//   componentDidUpdate() {
//     if (!this.state.authenticated) {
//       this.redirectRoute(this.props);
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextState.authenticated !== this.state.authenticated;
//   }

//   static getDerivedStateFromProps(props, state) {
//     const { location, user } = props;
//     const { pathname } = location;
//     const matched = state.routes.find((r) => r.path === pathname);
//     const authenticated =
//       matched && matched.auth && matched.auth.length
//         ? matched.auth.includes(user.role)
//         : true;

//     return {
//       authenticated,
//     };
//   }

//   redirectRoute(props) {
//     const { location, history } = props;
//     const { pathname } = location;

//     history.push({
//       pathname: "/session/signin",
//       state: { redirectUrl: pathname },
//     });
//   }

//   render() {
//     let { route } = this.props;
//     const { authenticated } = this.state;

//     return authenticated ? (
//       <Fragment>
//         <GullLayout route={route}></GullLayout>
//       </Fragment>
//     ) : null;
//   }
// }

// AuthGuard.contextType = AppContext;

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(AuthGuard);

import { flat } from "@utils";
import routes from "app/routes";
import { useSelector } from "react-redux";
import GullLayout from "app/GullLayout/GullLayout";
import React, { useState, useEffect } from "react";
import {Outlet, redirect, useLocation, useNavigate} from "react-router-dom";

const getUserRoleAuthStatus = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);

  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(user.role)
      : true;

  return authenticated;
};

const AuthGuard = () => {

  let authenticated = true; // Set to true if token exists
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(user);

  // const { pathname } = useLocation();
  // const [previouseRoute, setPreviousRoute] = useState(null);
  //
  // const isUserRoleAuthenticated = getUserRoleAuthStatus(
  //   pathname,
  //   user,
  //   flat(routes.routes)
  // );
  // let authenticated = false;

  // IF YOU NEED ROLE BASED AUTHENTICATION,
  // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
  // AND COMMENT OUT BELOW LINE

  const token = localStorage.getItem("jwt_token");
  // const  = localStorage.getItem("jwt_token");

  if(token){
    authenticated = true
  }else{
    authenticated = false
  }

  useEffect(() => {
    if (authenticated) {
      // If the user is already authenticated, redirect to the dashboard
      navigate('/dashboard/v1');
    } else {
      // If the user is not authenticated, redirect to the login page
      navigate('/sessions/signin');
    }

  }, [authenticated]);

  return authenticated ? (
      <GullLayout>
        <Outlet />
      </GullLayout>
  ) : null;
};
export default AuthGuard;
