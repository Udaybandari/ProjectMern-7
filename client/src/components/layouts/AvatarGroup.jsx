import React from "react";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  // Remove empty or invalid avatar URLs
  const validAvatars = avatars.filter(
    (avatar) => avatar && avatar.trim() !== ""
  );

  const visibleAvatars = validAvatars.slice(0, maxVisible);

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
        />
      ))}

      {validAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{validAvatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;