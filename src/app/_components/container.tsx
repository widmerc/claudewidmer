type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="w-full min-w-[200px] sm:min-w-[300px] lg:min-w-[500px] px-5 mx-auto ">
      {children}
    </div>
  );
};

export default Container;
