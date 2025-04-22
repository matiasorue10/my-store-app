/* eslint-disable prettier/prettier */
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import Products from "./Products";
import { useGetAllProductsQuery } from "./services/productsApi";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

jest.mock("@/src/components/ui/card/Card", () => "Card");
jest.mock("@/src/components/ui/remoteImage/RemoteImage", () => "RemoteImage");
jest.mock("./services/productsApi", () => ({
  useGetAllProductsQuery: jest.fn(),
}));
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

describe("Products component", () => {
  it("should show loading spinner when loading", () => {
    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <Products />
      </NavigationContainer>
    );
    expect(getByTestId("progress-indicator")).toBeTruthy();
  });

  it("should show error message when there is an error", () => {
    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByText } = render(
      <NavigationContainer>
        <Products />
      </NavigationContainer>
    );
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

    render(
      <NavigationContainer>
        <Products />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(screen.getByText("Category: Category 1")).toBeVisible();
      expect(screen.getByText("Price: 100$")).toBeVisible();
    });
  });

  it("should navigate to Product Details screen when a product is pressed", async () => {
    const mockNavigate = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const mockData = [
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        price: 100,
        image: "http://example.com/image1.jpg",
      },
    ];

    (useGetAllProductsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<Products />);

    await waitFor(() => {
      expect(getByText("Category: Category 1")).toBeTruthy();
    });

    fireEvent.press(getByText("Category: Category 1"));

    expect(mockNavigate).toHaveBeenCalledWith("ProductDetails", { itemId: 1 });
  });
});
