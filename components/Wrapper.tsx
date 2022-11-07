const Wrapper = ({ children }: { children: JSX.Element }) => (
  <div className="box-border flex max-lg  justify-center px-12 py-16 mt-4">
    {children}
  </div>
);

export default Wrapper;
