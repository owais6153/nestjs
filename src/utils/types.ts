export type CreateUserType = {
  username: string;
  password: string;
  email: string;
};

export type UpdateUserType = {
  username: string;
  password: string;
  email: string;
};

export type CreateUserProfileType = {
  firstName: string;
  lastName: string;
};

export type CreateUserPostType = {
  title: string;
  description: string;
};
