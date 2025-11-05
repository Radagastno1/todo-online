import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./slices/store";
import { Todo, addTodoAsync } from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

const Add = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const addTodo = () => {
    if (title !== "" && date !== "" && activeUser) {
      const todo: Todo = {
        id: "undefined",
        title,
        description,
        date,
        isDone: false,
        accountId: activeUser.accountId,
      };
      dispatch(addTodoAsync(todo));
      navigate("/todo");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 3, md: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 4,
          px: { xs: 3, md: 4 },
          py: { xs: 3, md: 4 },
          bgcolor: "rgba(255,255,255,0.98)",
          border: "1px solid rgba(244,143,177,0.4)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#3c2a3d",
            textAlign: "center",
          }}
        >
          Lägg till ny todo
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontSize: 13,
            color: "rgba(60,42,61,0.7)",
            textAlign: "center",
          }}
        >
          Skriv vad du ska göra, lägg till en liten beskrivning och välj när det
          ska vara klart.
        </Typography>

        <TextField
          label="Vad ska du göra?"
          variant="outlined"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Beskrivning (valfritt)"
          variant="outlined"
          multiline
          minRows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Datum & tid"
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={addTodo}
          sx={{
            py: 1.2,
            borderRadius: 999,
            backgroundColor: "#f48fb1",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#ec7ca5",
            },
          }}
        >
          Lägg till
        </Button>
      </Paper>
    </Box>
  );
};

export default Add;
