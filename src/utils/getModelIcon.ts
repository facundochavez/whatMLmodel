import ModelIcon1 from "@/icons/ModelIcon1";
import ModelIcon2 from "@/icons/ModelIcon2";
import ModelIcon3 from "@/icons/ModelIcon3";
import ModelIcon4 from "@/icons/ModelIcon4";
import ModelIcon5 from "@/icons/ModelIcon5";
import ModelIcon6 from "@/icons/ModelIcon6";
import ModelIcon7 from "@/icons/ModelIcon7";
import ModelIcon8 from "@/icons/ModelIcon8";
import ModelIcon9 from "@/icons/ModelIcon9";
import ModelIcon10 from "@/icons/ModelIcon10";
import ModelIcon11 from "@/icons/ModelIcon11";
import ModelIcon12 from "@/icons/ModelIcon12";
import ModelIcon13 from "@/icons/ModelIcon13";
import ModelIcon14 from "@/icons/ModelIcon14";
import ModelIcon15 from "@/icons/ModelIcon15";
import ModelIcon16 from "@/icons/ModelIcon16";
import ModelIcon17 from "@/icons/ModelIcon17";
import ModelIcon18 from "@/icons/ModelIcon18";
import ModelIcon19 from "@/icons/ModelIcon19";
import ModelIcon20 from "@/icons/ModelIcon20";
import ModelIcon21 from "@/icons/ModelIcon21";
import ModelIcon22 from "@/icons/ModelIcon22";
import ModelIcon23 from "@/icons/ModelIcon23";
import ModelIcon24 from "@/icons/ModelIcon24";
import ModelIcon25 from "@/icons/ModelIcon25";
import ModelIcon26 from "@/icons/ModelIcon26";
import ModelIcon27 from "@/icons/ModelIcon27";

const iconsMap: Record<number, React.FC> = {
  1: ModelIcon1,
  2: ModelIcon2,
  3: ModelIcon3,
  4: ModelIcon4,
  5: ModelIcon5,
  6: ModelIcon6,
  7: ModelIcon7,
  8: ModelIcon8,
  9: ModelIcon9,
  10: ModelIcon10,
  11: ModelIcon11,
  12: ModelIcon12,
  13: ModelIcon13,
  14: ModelIcon14,
  15: ModelIcon15,
  16: ModelIcon16,
  17: ModelIcon17,
  18: ModelIcon18,
  19: ModelIcon19,
  20: ModelIcon20,
  21: ModelIcon21,
  22: ModelIcon22,
  23: ModelIcon23,
  24: ModelIcon24,
  25: ModelIcon25,
  26: ModelIcon26,
  27: ModelIcon27,
};

export default function getModelIcon({
  iconNumber = 1,
}: {
  iconNumber: number;
}): React.FC {
  return iconsMap[iconNumber];
}
