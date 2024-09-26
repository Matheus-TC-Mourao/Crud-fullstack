import { useEffect, useRef } from "react";
import {
  Button,
  FormContainer,
  Input,
  InputArea,
  Label,
} from "../../styles/global";
import { toast } from "react-toastify";
import axios from "axios";

function Form({ onEdit, setOnEdit, getUsers }) {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
      user.date.value = onEdit.date;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.email.value ||
      !user.phone.value ||
      !user.date.value
    ) {
      return toast.warn("Fill in all fields");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          date: user.date.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          date: user.date.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    const clearFields = () => {
      user.name.value = "";
      user.email.value = "";
      user.phone.value = "";
      user.date.value = "";
    };

    clearFields();
    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </InputArea>
      <InputArea>
        <Label>Phone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>Birthday</Label>
        <Input name="date" type="date" />
      </InputArea>

      <Button type="submit">SAVE</Button>
    </FormContainer>
  );
}

export default Form;
