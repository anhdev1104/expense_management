const incomeCate = [
  {
    id: 1,
    icon: 'wallet-icon.svg',
    title: 'Tiền lương',
  },
  {
    id: 2,
    icon: 'piggy2-icon.svg',
    title: 'Tiền phụ cấp',
  },
  {
    id: 3,
    icon: 'gift-icon.svg',
    title: 'Tiền thưởng',
  },
  {
    id: 4,
    icon: 'money-icon.svg',
    title: 'Thu nhập phụ',
  },
  {
    id: 5,
    icon: 'coin-icon.svg',
    title: 'Đầu tư',
  },
  {
    id: 6,
    icon: 'cash-icon.svg',
    title: 'Thu nhập tạm thời',
  },
];

const IncomeCate = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      {incomeCate.length > 0 &&
        incomeCate.map(category => (
          <div
            className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1"
            key={category.id}
          >
            <img src={`/icon/${category.icon}`} className="w-16 h-16" />
            <span>{category.title}</span>
          </div>
        ))}
    </div>
  );
};

export default IncomeCate;
