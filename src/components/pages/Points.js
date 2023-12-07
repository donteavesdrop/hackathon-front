import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

const BusinessPoints = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState([]);
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
        const response = await axios.get("http://localhost:8080/business_points", {
          params: { token },
        });
        setPoints(response.data);
      } catch (error) {
        console.error("Ошибка при получении точек бизнеса:", error.message);
        setError("Ошибка при получении точек бизнеса");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <Layout>
      <h1>Точки бизнеса</h1>
      {error && <p>{error}</p>}
      <ul>
        {points.map((point) => (
          <li key={point.id}>
            <strong>Адрес:</strong> {point.address}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default BusinessPoints;
