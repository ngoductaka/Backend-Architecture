export const asyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    
    console.error('Async Handler Error:', err);
    
    next(err)});
};
