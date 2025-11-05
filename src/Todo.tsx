import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./slices/store";
import {
  Todo,
  deleteTodoAsync,
  editTodoAsync,
  fetchTodos,
} from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);
  const todos = useAppSelector((state) => state.todoSlice.todos);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(() =>
    getStartOfWeek(new Date())
  );
  const [currentEndDate, setCurrentEndDate] = useState<Date>(() =>
    getEndOfWeek(new Date())
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
    const startDate = getStartOfWeek(new Date());
    setCurrentStartDate(startDate);
    setCurrentEndDate(getEndOfWeek(startDate));
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      dispatch(fetchTodos(activeUser.accountId));
    }
  }, [activeUser, dispatch]);

  useEffect(() => {
    if (todos) {
      filterTodosByDateRange(todos, currentStartDate, currentEndDate);
    }
  }, [todos, currentStartDate, currentEndDate]);

  const filterTodosByDateRange = (
    todos: Todo[],
    startDate: Date,
    endDate: Date
  ) => {
    const filtered = todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return todoDate >= startDate && todoDate <= endDate;
    });
    const finished = filtered.filter((t) => t.isDone);
    setFinishedTodos(finished);
    const unFinished = filtered.filter((t) => !t.isDone);
    setFilteredTodos(unFinished);
  };

  const handleTodoToggle = (id: string) => {
    const todoToggled = todos.find((t) => t.id === id);
    if (todoToggled) {
      const updatedTodo = { ...todoToggled, isDone: !todoToggled.isDone };
      dispatch(editTodoAsync(updatedTodo));
    }
  };

  const handleSetEditMode = (todo: Todo) => {
    setEditedTodo(todo);
    setIsEditMode(true);
  };

  const handleEditTodo = () => {
    if (editedTodo) {
      const updatedTodo: Todo = {
        ...editedTodo,
        title: editedTodo.title,
        description: editedTodo.description,
        date: editedTodo.date,
      };
      dispatch(editTodoAsync(updatedTodo));
      setIsEditMode(false);
      setEditedTodo(null);
    }
  };

  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find((t) => t.id === id);
    if (todoToDelete) {
      dispatch(deleteTodoAsync(todoToDelete.id));
    }
  };

  const updateWeekForward = () => {
    const updatedStartDate = new Date(currentStartDate);
    updatedStartDate.setDate(updatedStartDate.getDate() + 7);
    setCurrentStartDate(updatedStartDate);
    setCurrentEndDate(getEndOfWeek(updatedStartDate));
  };

  const updateWeekBackwards = () => {
    const updatedStartDate = new Date(currentStartDate);
    updatedStartDate.setDate(updatedStartDate.getDate() - 7);
    setCurrentStartDate(updatedStartDate);
    setCurrentEndDate(getEndOfWeek(updatedStartDate));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedTodo(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Vecko-header */}
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          borderRadius: 999,
          bgcolor: "rgba(255,255,255,0.9)",
        }}
      >
        <IconButton size="small" onClick={updateWeekBackwards}>
          <ChevronLeftIcon sx={{ color: "#e91e63" }} />
        </IconButton>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 20 },
            fontWeight: 500,
            color: "#3c2a3d",
            textAlign: "center",
          }}
        >
          Vecka {getWeekNumber(currentStartDate)} •{" "}
          {formatDate(currentStartDate)} – {formatDate(currentEndDate)}
        </Typography>
        <IconButton size="small" onClick={updateWeekForward}>
          <ChevronRightIcon sx={{ color: "#e91e63" }} />
        </IconButton>
      </Paper>

      {/* Två kolumner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Att göra */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            borderRadius: 3,
            bgcolor: "#fff5fb",
            display: "flex",
            flexDirection: "column",
            maxHeight: { xs: "none", md: "calc(100vh - 220px)" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: "1px solid rgba(233,30,99,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                fontWeight: 600,
                color: "#3c2a3d",
              }}
            >
              Att göra
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/addtodo")}
              sx={{
                borderRadius: 999,
                px: 2.5,
                py: 0.5,
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
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1.5,
            }}
          >
            {filteredTodos.length === 0 && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: "rgba(60,42,61,0.7)",
                  textAlign: "center",
                  mt: 3,
                }}
              >
                Inga todos den här veckan ännu. Lägg till en uppgift 💫
              </Typography>
            )}

            {filteredTodos.map((todo) => (
              <Box
                key={todo.id}
                sx={{
                  my: 1.2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    width: "100%",
                    maxWidth: 520,
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    bgcolor: "white",
                    borderRadius: 2,
                  }}
                >
                  <Checkbox
                    checked={todo.isDone}
                    onChange={() => handleTodoToggle(todo.id)}
                    sx={{
                      mt: 0.5,
                      color: "#f48fb1",
                      "&.Mui-checked": { color: "#f06292" },
                    }}
                  />

                  {/* Visa- eller edit-läge */}
                  <Box sx={{ flexGrow: 1 }}>
                    {!isEditMode || editedTodo?.id !== todo.id ? (
                      <>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            textDecoration: todo.isDone
                              ? "line-through"
                              : "none",
                            color: "#3c2a3d",
                          }}
                        >
                          {todo.title}
                        </Typography>

                        {todo.description && (
                          <Typography
                            variant="body2"
                            title={todo.description}
                            sx={{
                              mt: 0.5,
                              fontSize: 13,
                              color: "rgba(60,42,61,0.8)",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {todo.description}
                          </Typography>
                        )}

                        <Typography
                          variant="caption"
                          sx={{
                            mt: 0.5,
                            display: "block",
                            color: "rgba(60,42,61,0.6)",
                          }}
                        >
                          Datum: {formatDate(new Date(todo.date))}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Titel"
                          size="small"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditTodo();
                          }}
                          value={editedTodo?.title}
                          onChange={(e) =>
                            setEditedTodo({
                              ...editedTodo!,
                              title: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Beskrivning"
                          multiline
                          minRows={2}
                          value={editedTodo?.description ?? ""}
                          onChange={(e) =>
                            setEditedTodo({
                              ...editedTodo!,
                              description: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Datum"
                          type="datetime-local"
                          value={editedTodo?.date}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditTodo();
                          }}
                          onChange={(e) =>
                            setEditedTodo({
                              ...editedTodo!,
                              date: e.target.value,
                            })
                          }
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      ml: 0.5,
                    }}
                  >
                    {!isEditMode || editedTodo?.id !== todo.id ? (
                      <>
                        <IconButton
                          onClick={() => handleSetEditMode(todo)}
                          size="small"
                          sx={{ mb: 0.5 }}
                        >
                          <EditIcon
                            fontSize="small"
                            sx={{ color: "#f06292" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteTodo(todo.id)}
                          size="small"
                        >
                          <DeleteOutlineIcon
                            fontSize="small"
                            sx={{ color: "#b0b0b0" }}
                          />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={handleEditTodo}
                          size="small"
                          sx={{ mb: 0.5 }}
                        >
                          <EditIcon
                            fontSize="small"
                            sx={{ color: "#4caf50" }}
                          />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} size="small">
                          <DeleteOutlineIcon
                            fontSize="small"
                            sx={{ color: "#e57373" }}
                          />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Klara todos */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            borderRadius: 3,
            bgcolor: "#fdf7ff",
            display: "flex",
            flexDirection: "column",
            maxHeight: { xs: "none", md: "calc(100vh - 220px)" },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: "1px solid rgba(156,39,176,0.15)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                fontWeight: 600,
                color: "#4a148c",
              }}
            >
              Klart ✅
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1.5,
            }}
          >
            {finishedTodos.length === 0 && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: "rgba(74,20,140,0.6)",
                  textAlign: "center",
                  mt: 3,
                }}
              >
                Inga färdiga uppgifter ännu.
              </Typography>
            )}

            {finishedTodos.map((todo) => (
              <Box
                key={todo.id}
                sx={{ my: 1.2, display: "flex", justifyContent: "center" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    maxWidth: 520,
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    bgcolor: "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                  }}
                >
                  <Checkbox
                    checked={todo.isDone}
                    onChange={() => handleTodoToggle(todo.id)}
                    sx={{
                      mt: 0.5,
                      color: "#4caf50",
                      "&.Mui-checked": { color: "#66bb6a" },
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        textDecoration: "line-through",
                        color: "rgba(0,0,0,0.6)",
                      }}
                    >
                      {todo.title}
                    </Typography>
                    {todo.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          fontSize: 13,
                          color: "rgba(0,0,0,0.55)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {todo.description}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        display: "block",
                        color: "rgba(0,0,0,0.45)",
                      }}
                    >
                      Klar: {formatDate(new Date(todo.date))}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Fullscreen-overlay för editerad todo – hanteras redan via state */}
      {/* (Inget extra här) */}
      {activeUser && null}
    </Box>
  );
}

// Helper functions (samma som tidigare)
function getStartOfWeek(date: Date): Date {
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

function getEndOfWeek(date: Date): Date {
  const endOfWeek = new Date(getStartOfWeek(date));
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}

function getWeekNumber(date: Date): number {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
