import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
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

      try {
        const response = await axios.get("http://localhost:8080/employees", {
          params: { token },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Ошибка при получении сотрудников:", error.message);
        setError("Ошибка при получении сотрудников");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <Layout>
      <h1>Сотрудники</h1>
      {error && <p>{error}</p>}
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <strong>Имя:</strong> {employee.name},{" "}
            <strong>Должность:</strong> {employee.grade.gradeName}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Employees;
