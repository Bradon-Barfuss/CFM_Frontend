import React, { useState } from "react";
import { addLesson } from "../api";

const LessonForm = () => {
  const [lesson, setLesson] = useState({ week: "", background: "", verses: [], questions: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLesson(lesson);
    alert("Lesson added successfully!");
    setLesson({ week: "", background: "", verses: [], questions: [] });
  };

  return (
    <form className="p-4 bg-white shadow rounded" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Add Lesson</h2>
      <input
        type="number"
        placeholder="Week"
        className="block w-full mb-2 p-2 border rounded"
        value={lesson.week}
        onChange={(e) => setLesson({ ...lesson, week: e.target.value })}
      />
      <textarea
        placeholder="Background"
        className="block w-full mb-2 p-2 border rounded"
        value={lesson.background}
        onChange={(e) => setLesson({ ...lesson, background: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add Lesson
      </button>
    </form>
  );
};

export default LessonForm;
