import GlobalStyle, { Container, Title } from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Form from "./components/Form/Form";
import Grid from "./components/Grid/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USERS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
