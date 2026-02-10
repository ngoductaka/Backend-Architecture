export const asyncHandler = (fn) => (req, res, next) => {
  console.log("Async Handler Invoked", fn);
  fn(req, res, next).catch((err) => {
    console.error("Async Handler Error:", err);

    next(err);
  });
};
