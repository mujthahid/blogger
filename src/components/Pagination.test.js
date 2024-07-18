import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Pagination from "./Pagination"; // Adjust the import path as per your project structure

describe("Pagination component", () => {

  it("renders pagination buttons correctly", async() => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        pagesToShow={5}
      />
    );

    // Assert pagination buttons are rendered correctly
    expect(screen.queryByTestId("skip-previous-button")).toBeNull();
    expect(screen.getByTestId("page-button-3")).toBeInTheDocument();
    expect(screen.getByTestId("skip-next-button")).toBeInTheDocument();
  });

});

it("calls onPageChange correctly on button clicks", async () => {
  const onPageChangeMock = jest.fn();
  render(
    <Pagination
      currentPage={5}
      totalPages={10}
      onPageChange={onPageChangeMock}
      pagesToShow={5}
    />
  );

  // Click SkipNext button
  fireEvent.click(screen.getByTestId("skip-next-button"));
  // Wait for the callback to be called
  await waitFor(() => {
    expect(onPageChangeMock).toHaveBeenCalledWith(6);
  });

  // Click on page 7 button
  fireEvent.click(screen.getByTestId("page-button-7"));
  // Wait for the callback to be called
  await waitFor(() => {
    expect(onPageChangeMock).toHaveBeenCalledWith(7);
  });
});
