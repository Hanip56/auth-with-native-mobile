export type User = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
  token: string;
};
