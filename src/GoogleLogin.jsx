import Google from "react-google-login";


import React, {useState} from 'react';

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
    const onSuccess = async (res) => {
      try {
        const result = await fetch("http://localhost:800/auth/googleAuth", {
          token: res?.tokenId,
        });


        const parsedRes = await result.json()
        console.log("on success", parsedRes)

  
        setUser(parsedRes.user);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="h-screen w-screen flex items-center justify-center flex-col">
        {!user && (
          <Google
            clientId='44918824988-cohh4f1c4035rqvb5s00hjnkvc0qmjqf.apps.googleusercontent.com'
            onSuccess={onSuccess}
          />
        )}
  
        {user && (
          <>
            <img src={user.avatar} className="rounded-full" />
            <h1 className="text-xl font-semibold text-center my-5">
              {user.name}
            </h1>
          </>
        )}
      </div>
    );
  };

  export default GoogleAuth