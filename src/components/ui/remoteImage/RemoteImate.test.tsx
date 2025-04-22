import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import RemoteImage from "./RemoteImage";

describe("RemoteImage", () => {
  it("should show the progress component while the image is loading", () => {
    const { getByTestId } = render(
      <RemoteImage uri="https://example.com/image.jpg" />,
    );

    const progress = getByTestId("progress-circle");
    expect(progress).toBeVisible();
  });

  it("should hide the progress and shows the image once it has finished loading", async () => {
    const { getByTestId, queryByTestId } = render(
      <RemoteImage uri="https://example.com/image.jpg" />,
    );

    const image = getByTestId("image");
    await waitFor(() => {
      image.props.onLoadEnd();
    });

    expect(image).toBeVisible();
    const progress = queryByTestId("progress-circle");
    expect(progress).not.toBeVisible();
  });
});
