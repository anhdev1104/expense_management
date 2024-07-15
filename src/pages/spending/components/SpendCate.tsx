import React from 'react';

const SpendCate = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-3">
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/food-icon.svg" alt="icon food" className="w-16 h-16" />
        <span>Ăn uống</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/clothes-icon.svg" alt="icon clothes" className="w-16 h-16" />
        <span>Quần áo</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/hopital-icon.svg" alt="icon hospital" className="w-16 h-16" />
        <span>Y tế</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/washing-icon.svg" alt="icon washing" className="w-16 h-16" />
        <span>Chi tiêu hằng ngày</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/cosmetics-icon.svg" alt="icon cosmetics" className="w-16 h-16" />
        <span>Mỹ phẩm</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/beer-icon.svg" alt="icon beer" className="w-16 h-16" />
        <span>Giao lưu</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/education-icon.svg" alt="icon education" className="w-16 h-16" />
        <span>Giáo dục</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/water-icon.svg" alt="icon water" className="w-16 h-16" />
        <span>Điện nước</span>
      </div>
      <div className="flex flex-col items-center border-2 border-borderColor rounded-md cursor-pointer hover:border-primary transition-all ease-linear p-2 gap-1">
        <img src="/icon/bus-icon.svg" alt="icon bus" className="w-16 h-16" />
        <span>Đi lại</span>
      </div>
    </div>
  );
};

export default SpendCate;
