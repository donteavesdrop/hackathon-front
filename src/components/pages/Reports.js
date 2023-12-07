import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

const Reports = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
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
        const reportResponse = await axios.get("http://localhost:8080/report", {
          params: { token },
        });

        const data = reportResponse.data;
        setReportData(data);
      } catch (error) {
        console.error("Ошибка при получении отчета:", error.message);
        setError("Ошибка при получении отчета");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <Layout>
      <h1>Отчеты</h1>
      {error && <p>{error}</p>}
      {reportData && (
        <div>
          <h2>Отчет</h2>
          <ul>
            {reportData.map((item, index) => (
              <li key={index}>
                <strong>Сотрудник:</strong> {item.employee.name},{" "}
                <strong>Среднее время в пути:</strong> {item.avgRoadTime},{" "}
                <strong>Среднее время выполнения:</strong>{" "}
                {item.avgCompletionTime},{" "}
                <strong>Выполненные задачи:</strong> {item.completedTask}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Reports;
