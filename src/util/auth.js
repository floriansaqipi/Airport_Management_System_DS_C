import { redirect } from "react-router-dom";

export function getTokenDuration(){
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuth() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  if (token == null || username == null || role == null) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  
  if(tokenDuration < 0){
    return 'EXPIRED';
  }

  return {
    token,
    username,
    role,
  };
}

export function authLoader(){
    return getAuth();
}

export function checkAuthLoader(){
    const auth = getAuth();

    if(auth == null){
        return redirect("/login")
    }
    return null;
}
