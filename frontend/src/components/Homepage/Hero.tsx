const Hero = () => {
  return (
    <div className='relative flex justify-center items-center w-full max-h-[650px]'>
      <img src="../public/cosmos.jpg" className="w-full h-full object-fill"></img>
      <div className="absolute bottom-[1rem] right-[0.5rem]">
        <h1 className="text-7xl">Explore the Expanse</h1>
      </div>
    </div>
  );
};

export default Hero;
