import { render, fireEvent } from "@testing-library/react-native";
import Input from "./Input";

describe("Input component", () => {
  it("should render correctly with placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter your name" />,
    );
    expect(getByPlaceholderText("Enter your name")).toBeVisible();
  });

  it("should call onChangeText when typing", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" onChangeText={onChangeTextMock} />,
    );

    fireEvent.changeText(getByPlaceholderText("Type here"), "Hello");
    expect(onChangeTextMock).toHaveBeenCalledWith("Hello");
  });

  it("should display the value passed as prop", () => {
    const { getByDisplayValue } = render(
      <Input value="preset value" onChangeText={() => {}} />,
    );
    expect(getByDisplayValue("preset value")).toBeVisible();
  });

  it("should apply custom className if provided", () => {
    const { getByTestId } = render(
      <Input testID="input" className="bg-red-500" />,
    );
    const input = getByTestId("input");
    expect(input.props.className).toContain("bg-red-500");
  });
});
