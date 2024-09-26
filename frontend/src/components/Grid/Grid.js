import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../styles/global";

function Grid({ users, setUsers, setOnEdit }) {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th onlyWeb>Phone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.name}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.phone}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;
