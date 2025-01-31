export type Issue = {
  id: string;
  number: number;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
};
