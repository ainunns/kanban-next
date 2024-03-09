export const showFormattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type colorType = 'primary' | 'success' | 'warning' | 'danger';

export const randomColor = () => {
  const colors: colorType[] = ['primary', 'success', 'warning', 'danger'];
  return colors[Math.floor(Math.random() * colors.length)];
};
