import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import Card from "./Card";

describe("Card component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(<Card title="Card Title" />);
    expect(getByText("Card Title")).toBeVisible();
  });

  it("renders the description when provided", () => {
    const { getByText } = render(
      <Card title="Card Title" description="This is a description" />,
    );
    expect(getByText("This is a description")).toBeVisible();
  });

  it("does not render description if not provided", () => {
    const { queryByText } = render(<Card title="Card Title" />);
    expect(queryByText("This is a description")).not.toBeVisible();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <Card title="With Children">
        <Text>Child content</Text>
      </Card>,
    );
    expect(getByText("Child content")).toBeVisible();
  });

  it("applies custom className if provided", () => {
    const { getByTestId } = render(
      <Card title="Styled" className="border" testID="card" />,
    );
    const card = getByTestId("card");
    expect(card.props.className).toContain("border");
  });
});
