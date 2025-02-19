import { ReactNode } from "react";

interface NoiseEffectBgProps {
  children: ReactNode;
}

const NoiseEffectBg = ({ children }: NoiseEffectBgProps) => {
  return (
    <div
      className="flex items-center justify-center w-full bg-[#01D396] rounded-3xl bg-noise-texture"
      style={{
        backgroundImage: `linear-gradient(180deg, #00000000 0%, #12151A80 50%), linear-gradient(90deg, #00000000 0%, #12151A80 50%), url('/noise.svg')`,
      }}
    >
      {children}
    </div>
  );
};

export default NoiseEffectBg;