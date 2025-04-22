import { render, waitFor, screen } from "@testing-library/react-native";
import Products from "./Products";
import { useGetAllProductsQuery } from "./services/productsApi";

jest.mock("@/src/components/ui/card/Card", () => "Card");
jest.mock("@/src/components/ui/remoteImage/RemoteImage", () => "RemoteImage");
jest.mock("./services/productsApi", () => ({
  useGetAllProductsQuery: jest.fn(),
}));

describe("Products component", () => {
  it("should show loading spinner when loading", () => {
    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(<Products />);
    expect(getByTestId("progress-indicator")).toBeTruthy();
  });

  it("should show error message when there is an error", () => {
    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByText } = render(<Products />);
    expect(getByText("Oh no, there was an error. Please retry")).toBeVisible();
  });

  it("should render list of products when data is available", async () => {
    const mockData = [
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        price: 100,
        image: "http://example.com/image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        category: "Category 2",
        price: 200,
        image: "http://example.com/image2.jpg",
      },
    ];

    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Category: Category 1")).toBeVisible();
      expect(screen.getByText("Price: 100$")).toBeVisible();
    });
  });
});
