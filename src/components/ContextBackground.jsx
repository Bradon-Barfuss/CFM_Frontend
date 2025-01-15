import React from "react";

const ContextBackground = ({ onContentChange, content }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 border border-gray-200">
      <div className="font-bold text-gray-800 mb-2">Context Background:</div>
    <textarea
    value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className="w-full h-24 border-none focus:outline-none resize-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgdmlld0JveD0nMCAwIDEwIDEwJz48bGluZSB4MT0nMCcgeTE9JzUnIHgyPScxMCcgeTI9JzUnIHN0cm9rZT0nYmxhY2snIHN0cm9rZS13aWR0aD0nMC4xJy8+PC9zdmc+')] bg-repeat-y pl-2 pt-2 text-gray-700 text-sm"
      placeholder="Write your context background here..."
      />
    </div>
  );
};

export default ContextBackground;
