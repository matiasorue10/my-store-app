import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "./Login";
import { useLoginMutation } from "../authApi";
import { setCredentials } from "../authSlice";
import { useAppDispatch } from "@/src/app/hooks";

jest.mock("../authApi", () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock("../authSlice", () => ({
  setCredentials: jest.fn(),
}));

jest.mock("@/src/app/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("Login Component", () => {
  const mockDispatch = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false, error: null },
    ]);
  });

  it("should render inputs and button correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText("Username")).toBeVisible();
    expect(getByPlaceholderText("Password")).toBeVisible();
    expect(getByText("Submit")).toBeVisible();
  });

  it("should show validation error when username is empty", async () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("Submit"));
    await waitFor(() => {
      expect(getByText("The username is required.")).toBeVisible();
      expect(getByText("The password is required.")).toBeVisible();
    });
  });

  it("should submit form with valid input and dispatches credentials", async () => {
    const mockResponse = {
      token: "fake-token",
      user: { id: 1, username: "test" },
    };

    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin.mockResolvedValue(mockResponse),
      { isLoading: false, isSuccess: true, error: null, data: mockResponse },
    ]);

    const { getByPlaceholderText, getByText } = render(<Login />);
    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Submit");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
      expect(mockDispatch).toHaveBeenCalledWith(setCredentials(mockResponse));
    });
  });

  it("should display an error message when login fails", async () => {
    const mockResponse = { data: "Invalid username or password" };
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin.mockResolvedValue(mockResponse),
      {
        isLoading: false,
        isSuccess: false,
        error: mockResponse,
        data: null,
      },
    ]);

    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("Username"), "user");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrong");
    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(
        getByText("Login failed: Invalid username or password"),
      ).toBeVisible();
    });
  });
});
