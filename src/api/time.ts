"use server";

export const getName = () => {
  const date = new Date();
  return `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
};
