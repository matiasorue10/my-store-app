import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";

describe("Button component", () => {
  it("should render the title correctly", () => {
    const { getByText } = render(<Button title="Click me" />);
    expect(getByText("Click me")).toBeVisible();
  });

  it("should apply primary styles by default", () => {
    const { getByText } = render(<Button title="Primary" />);
    const text = getByText("Primary");

    expect(text.props.className).toContain("text-white");
  });

  it("should handle onPress", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button title="Press me" onPress={onPressMock} />,
    );
    const button = getByRole("button");

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
