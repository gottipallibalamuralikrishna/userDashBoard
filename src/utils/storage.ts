export const getItem = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const setItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};