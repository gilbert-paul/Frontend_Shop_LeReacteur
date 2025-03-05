import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-full flex flex-col items-center gap-10 overflow-hidden">
      <div className="flex relative justify-center max-h-120">
        <div className="border-r-primary border w-[80%]">
          <img
            className="w-full h-full object-cover "
            src="/home-right.jpeg"
            alt="right-wallpaper"
          />
        </div>
        <div className="border-l-primary border">
          <img
            className="w-full h-full object-cover"
            src="/home-left.jpg"
            alt="left-wallpaper"
          />
        </div>
        <div className="absolute bottom-10 flex justify-center items-center flex-col gap-4 bg-black-opacity p-4">
          <div className="hidden md:flex text-secondary text-lg">
            Take a deep breath, and discover our products !
          </div>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className=" text-white border w-fit border-white py-3 px-4 text-lg hover:cursor-pointer hover:opacity-80"
          >
            All products
          </button>
        </div>
      </div>
      <div className="text-primary text-2xl">
        One shop, thirty products: only what do you need !
      </div>
      <div className="flex justify-center gap-4 items-center h-40 mt-10">
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
    </div>
  );
};

export { Home };
