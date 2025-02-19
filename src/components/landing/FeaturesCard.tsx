const FeaturesCard = ({ 
  bgColor, 
  title, 
  description, 
  image1, 
  image1Width, 
  image1Position, 
  image2, 
  image2Width, 
  image2Position 
}:any) => {
  return (
    <div className="flex-1 h-full">
      <div className={`2xl:px-10 px-6 2xl:pt-12 pt-8 rounded-3xl relative w-full ${image1 == "/f10.svg" ? "min-h-[500px] lg:min-h-[363.64px] lg:h-full": " min-h-[300px] lg:min-h-[363.64px] lg:h-full"}`} style={{ backgroundColor: bgColor,  backgroundImage: `url('/noise.svg')` }}
      >
        <h4 className="2xl:text-[25px] lg:text-[22px] text-[20px] font-kaleko font-extrabold leading-tight">{title}</h4>
        <p className="2xl:text-2xl lg:text-[22px] text-[20px] mt-6 font-kaleko font-normal leading-tight">
          {description}
        </p>
        
        <div>
          {image1 && (
            <img 
              src={image1} 
              width={image1Width} 
              className={`absolute ${image1Position}`} 
            />
          )}
          {image2 && (
            <img 
              src={image2} 
              width={image2Width} 
              className={`absolute ${image2Position}`} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;