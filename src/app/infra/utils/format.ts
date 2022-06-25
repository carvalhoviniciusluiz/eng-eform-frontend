const dateFormat = (value: Date): string => {
  return new Date(value).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const Fn = {
  dateFormat
};
