export const mockUserData = {
  full_name: "John Doe",
  avatar_url: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
};

export const createMockUserData = (
  fullName: string = "John Doe",
  avatarUrl: string = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
) => {
  return {
    full_name: fullName,
    avatar_url: avatarUrl,
  };
};

export const mockUserDataWithoutAvatar = {
  full_name: "Jane Doe",
  avatar_url: "",
};

export const mockLoadingUserData = {
  full_name: "Loading...",
  avatar_url: "",
};

export const mockHandleSignOut = () => {
  console.log("Mock Sign Out");
};

export const mockHandleMatters = () => {
  console.log("Mock Go to Dashboard");
};

export const mockLoadingState = {
  signOutLoading: false,
  dashboardLoading: false,
  isLoading: false,
};

export const mockActionButtonsState = {
  dashboardLoading: false,
  signOutLoading: false,
  isLoading: false,
};
