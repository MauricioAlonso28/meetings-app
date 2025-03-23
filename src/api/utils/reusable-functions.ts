export function changeAndCompare(
  age: Date
) {
  const today = new Date();
  let newAge = today.getFullYear() - age.getFullYear();

  if (
    (today.getMonth() + 1) < (age.getMonth() + 1) ||
    ((today.getMonth() + 1) === (age.getMonth() + 1) && today.getDate() < (age.getDate() + 1))
  ) {
    newAge--;
  }

  return newAge
}