import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

const WORDS_TO_TEST = ["apple"];

test("snapshot test for stability", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
})

// smoke test
test("renders without crashing", function () {
  render(<Snowman />);
});


test("show lose message after max wrong guesses", function() {
  const { container } = render(<Snowman words={WORDS_TO_TEST}/>);

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
  expect(container.querySelector(".Snowman-lose")).toContainHTML("You lose!");
})

test("check if nWrong increases after wrong selection", function() {
  const { container } = render(<Snowman words={WORDS_TO_TEST}/>);

  fireEvent.click(container.querySelector(`button[value='x']`));
  expect(
    container.querySelector(".Snowman-wrong"))
    .toContainHTML("Number wrong: 1");

});

test("restart game", function() {
  const { container } = render(<Snowman words={WORDS_TO_TEST}/>);

  fireEvent.click(container.querySelector(`button[value='a']`));
  fireEvent.click(container.querySelector(`button[value='p']`));
  fireEvent.click(container.querySelector(`button[value='x']`));

  expect(container.querySelector(".Snowman-word")).toContainHTML("app__");
  expect(
    container.querySelector(".Snowman-wrong"))
    .toContainHTML("Number wrong: 1");

  fireEvent.click(container.querySelector(".Snowman-restart"));

  expect(container.querySelector(".Snowman-word")).toContainHTML("____");
  expect(
    container.querySelector(".Snowman-wrong"))
    .toContainHTML("Number wrong: 0");

});

test("button deactivated after selected", function() {
  const { container } = render(<Snowman words={WORDS_TO_TEST}/>);

  fireEvent.click(container.querySelector("button[value='a']"));
  expect(container.querySelector("button[value='a']")).toHaveAttribute('disabled');
  expect(container.querySelector("button[value='a']")).toBeDisabled();
  expect(container.querySelector("button[value='b']")).not.toBeDisabled();

})



