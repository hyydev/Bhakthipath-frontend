import imgA from "../../../assets/Auth/Login/imgA.jpeg";
import imgB from "../../../assets/Auth/Login/imgB.jpeg";
import imgC from "../../../assets/Auth/Login/imgC.jpeg";

export default function LoginImageCarousal() {
  const slides = [imgA, imgB, imgC];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        />
      ))}
    </div>
  );
}
