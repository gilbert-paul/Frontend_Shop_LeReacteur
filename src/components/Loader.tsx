const Loader = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-4">
      <div className="flex justify-center gap-4 items-center h-10">
        <img
          style={{ animationDelay: "150ms" }}
          className="animate-bounce w-full h-full object-contain"
          src="/carrot.webp"
          alt=""
        />
        <img
          style={{ animationDelay: "300ms" }}
          className="animate-bounce w-full h-full object-contain"
          src="/steak.webp"
          alt=""
        />
        <img
          style={{ animationDelay: "450ms" }}
          className="animate-bounce w-full h-full object-contain"
          src="/sofa.webp"
          alt=""
        />
        <img
          style={{ animationDelay: "600ms" }}
          className="animate-bounce w-full h-full object-contain"
          src="/shampoo.webp"
          alt=""
        />
      </div>
      <span className="text-primary">Loading...</span>
    </div>
  );
};

export { Loader };
