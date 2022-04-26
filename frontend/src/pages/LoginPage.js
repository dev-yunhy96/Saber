import React, { useState } from "react";

function LoginPage() {
  const [Email, setEamil] = useState("");
  const [Password, setPassword] = useState("");
  const onEmailHandler = (event) => {
    setEamil(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
  };
  return (
    <div>
      <div>로그인페이지</div>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
