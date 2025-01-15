import React, { useEffect, useState } from "react";
import { getLessons } from "../api";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const data = await getLessons();
      setLessons(data);
    };
    fetchLessons();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lesson Plans</h1>
      <ul className="space-y-2">
        {lessons.map((lesson, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-bold">Week {lesson.week}</h2>
            <p>{lesson.background}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
