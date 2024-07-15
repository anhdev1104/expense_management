const IncomeCate = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/wallet-icon.svg" alt="icon wallet" className="w-16 h-16" />
        <span>Tiền lương</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/piggy2-icon.svg" alt="icon piggy" className="w-16 h-16" />
        <span>Tiền phụ cấp</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/gift-icon.svg" alt="icon gift" className="w-16 h-16" />
        <span>Tiền thưởng</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/money-icon.svg" alt="icon money" className="w-16 h-16" />
        <span>Thu nhập phụ</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/coin-icon.svg" alt="icon coin" className="w-16 h-16" />
        <span>Đầu tư</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/cash-icon.svg" alt="icon cash" className="w-16 h-16" />
        <span>Thu nhập tạm thời</span>
      </div>
    </div>
  );
};

export default IncomeCate;
