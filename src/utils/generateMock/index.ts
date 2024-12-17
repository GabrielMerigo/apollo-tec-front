interface GenerateArrayMockSampleProps {
  text?: string;
  MAX_LIMIT: number;
  MIN_LIMIT: number;
}

export const generateArrayMockSample = ({
  text,
  MIN_LIMIT,
  MAX_LIMIT,
}: GenerateArrayMockSampleProps) =>
  Array.from(
    { length: Math.random() * (MAX_LIMIT - MIN_LIMIT) + MIN_LIMIT },
    (_, index) => (text ? `${text} ${index + 1}` : `${index + 1}`)
  );
