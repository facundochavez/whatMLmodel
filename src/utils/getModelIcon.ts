import * as Icons from "@/icons";

export default function getModelIcon({
  iconNumber = 1,
}: {
  iconNumber: number;
}): React.FC | undefined {
  const iconKey = `ModelIcon${iconNumber}`;
  return Icons[iconKey as keyof typeof Icons];
}
