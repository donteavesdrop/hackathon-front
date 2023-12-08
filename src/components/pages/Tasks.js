import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      // Проверка наличия токена в localStorage
      const token = localStorage.getItem("token");

      // Если токен отсутствует, перенаправляем пользователя на страницу входа
      if (!token) {
        navigate("/");
        return;
      }
    }
    checkLogin();
  } , [navigate]);
  const handleAssign = async () => {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem("token");
    // Если токен отсутствует, перенаправляем пользователя на страницу входа
    if (!token) {
      navigate("/");
      return;
    }
    try {
      console.log("Начало выполнения assign...");

      // Выполнение assign с использованием метода GET
      await axios.get("http://localhost:8080/tasks/assign", { params: { token } });
      console.log("Assign выполнен успешно.");

      // Получение данных через status после assign
      const statusResponse = await axios.get("http://localhost:8080/tasks/status", {
        params: { token },
      });
      console.log("Данные получены успешно:", statusResponse.data);

      setTasks(statusResponse.data);
    } catch (error) {
      console.error(`Ошибка при выполнении assign или получении задач:`, error.message);
      setError(`Ошибка при выполнении assign или получении задач`);
    }
  };

  const handleView = async () => {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem("token");

    // Если токен отсутствует, перенаправляем пользователя на страницу входа
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      console.log("Начало получения задач в режиме view...");

      // Запрос данных в режиме view
      const response = await axios.get("http://localhost:8080/tasks/data", {
        params: { token },
      });
      console.log("Данные получены успешно:", response.data);

      setTasks(response.data);
    } catch (error) {
      console.error(`Ошибка при получении задач (view):`, error.message);
      setError(`Ошибка при получении задач (view)`);
    }
  };

  return (
    <Layout>
      <h1>Управление задачами</h1>
      <div>
        <button onClick={handleView}>Показать все задачи</button>
        <button onClick={handleAssign}>Распределить задачи</button>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Название задачи:</strong> {task.taskName},{" "}
            <strong>Статус:</strong> {task.status || "Статус не определен"}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tasks;
