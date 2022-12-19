import styled from "styled-components";

export const Container = styled.div`
  min-width: 300px;
  margin: auto;

  form {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  input[type="username"],
  input[type="email"],
  input[type="password"] {
    width: 250px;
    color: #fff !important;
  }
  Button[type="submit"] {
    width: 100px;
  }
`;

export const Logo = styled.img``;
