export const getBgColor = () => {
  const bgarr = [
    "#b73e3e",
    "#5b45b0",
    "#7f167f",
    "#735f32",
    "#1d2569",
    "#285430",
    "#f6b100",
    "#2e4a40",
    "#664a04",
    "#f5f5f5",
  ];
  const randomBg = Math.floor(Math.random() * bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name => {
  if(!name) return "";
  return name.split(" ").map(word => word[0]).join("").toUpperCase();
})

// export const getAvatarName = (name) => {
//   if (!name || typeof name !== "string") return "N/A";
//   const parts = name.trim().split(" ");
//   if (parts.length === 1) return parts[0][0].toUpperCase();
//   return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
// };


export const formatDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};