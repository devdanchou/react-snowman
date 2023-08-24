import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

test("matches snapshot", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
})

test("show lose message after max wrong guesses", function() {
  const { container } = render(<Snowman words={["apple"]}/>);

  // const z = container.querySelector("button[value='z']")
  // const y = container.querySelector("button[value='y']")
  // const x = container.querySelector("button[value='x']")
  // const h = container.querySelector("button[value='h']")
  // const i = container.querySelector("button[value='i']")
  // const q = container.querySelector("button[value='q']")

  // let wrongGuessBtn = [z, y, x, h, i, q];
  // wrongGuessBtn.map(btn => fireEvent.click(btn));

  let wrongGuessLtrs = ["z", "y", "x", "h", "i", "q"];

  wrongGuessLtrs.map(
    ltr => fireEvent.click(container.querySelector(`button[value='${ltr}']`))
  );

  expect(container.querySelector(".Snowman-lose")).toBeInTheDocument();
  expect(container.querySelector(".Snowman-ltrs")).not.toBeInTheDocument();

})