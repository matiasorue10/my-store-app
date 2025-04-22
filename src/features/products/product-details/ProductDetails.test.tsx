import { render, waitFor, screen } from "@testing-library/react-native";
import ProductDetails from "./ProductDetails";
import { useGetProductByIdQuery } from "../services/productsApi";

jest.mock("@/src/components/ui/card/Card", () => "Card");
jest.mock("@/src/components/ui/remoteImage/RemoteImage", () => "RemoteImage");
jest.mock("../services/productsApi", () => ({
  useGetProductByIdQuery: jest.fn(),
}));

describe("ProductDetails component", () => {
  const mockRoute = {
    params: {
      itemId: 1,
    },
  };

  it("should show loading spinner when loading", () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(<ProductDetails route={mockRoute as any} />);
    expect(getByTestId("progress-indicator")).toBeTruthy();
  });

  it("should show error message when there is an error", () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByText } = render(<ProductDetails route={mockRoute as any} />);
    expect(getByText("Oh no, there was an error. Please retry")).toBeVisible();
  });

  it("should render product details when data is available", async () => {
    const mockData = {
      id: 1,
      title: "Test Product",
      description: "A great product",
      category: "Test Category",
      price: 123,
      image: "http://example.com/image.jpg",
    };

    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<ProductDetails route={mockRoute as any} />);

    await waitFor(() => {
      expect(screen.getByText("Category: Test Category")).toBeVisible();
      expect(screen.getByText("Price: 123$")).toBeVisible();
    });
  });
});
