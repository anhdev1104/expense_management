import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tab from './components/Tab';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import { styled } from '@mui/material';
import SpendCate from './components/SpendCate';
import Button from '@/components/button';

const CustomDatePicker = styled(DatePicker)(() => ({
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: '#f2f3f5',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
}));

const SpendingPage = () => {
  const [tabActive, setTabActive] = useState<number>(1);

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setTabActive(id);
  };

  return (
    <div className="mt-[120px] mb-20">
      <Tab tabActive={tabActive} onClick={handleActiveTab} />
      <form action="" className="mt-10 w-[700px] px-10 mx-auto bg-white" autoComplete="off">
        <Field>
          <Label>Ngày</Label>
          <div className="mt-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatePicker />
            </LocalizationProvider>
          </div>
        </Field>
        <Field>
          <Label htmlFor="description">Ghi chú</Label>
          <Input id="description" name="description" placeholder="Nhập nội dung" className="mt-3" />
        </Field>
        <Field>
          <Label htmlFor="spend">Tiền chi</Label>
          <Input id="spend" name="spend" placeholder="Nhập số tiền" className="mt-3" />
        </Field>
        <Field>
          <Label>Danh mục</Label>
          <SpendCate />
        </Field>
        <div className="mt-10">
          <Button type="submit">Nhập khoảng chi</Button>
        </div>
      </form>
    </div>
  );
};

export default SpendingPage;
