import React, { useEffect, useState } from 'react';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import Tab from './components/Tab';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import SpendCate from './components/SpendCate';
import Button from '@/components/button';
import IncomeCate from './components/IncomeCate';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import DatePickerCustom from '@/components/date/DatePickerCustom';

interface IFormSpend {
  spend: number;
  date: Date;
  description?: string;
}

const schema = yup
  .object({
    date: yup.date().required('Vui lòng chọn ngày!'),
    spend: yup.number().typeError('Vui lòng nhập số tiền hợp lệ!').required('Vui lòng nhập tiền chi !'),
  })
  .required();

const SpendingPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    control,
    reset,
  } = useForm<IFormSpend>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const [tabActive, setTabActive] = useState<number>(1);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    console.log(errors);

    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setTabActive(id);
  };

  const onSpendingHandler: SubmitHandler<IFormSpend> = values => {
    if (!isValid) return;
    console.log(values);
    reset();
  };

  return (
    <div className="mt-[120px] mb-20">
      <Tab tabActive={tabActive} onClick={handleActiveTab} />
      <form
        action=""
        className="mt-5 w-[700px] px-10 mx-auto"
        autoComplete="off"
        onSubmit={handleSubmit(onSpendingHandler)}
      >
        <Field>
          <DatePickerCustom control={control} />
        </Field>
        <Field>
          <Label htmlFor="description">Ghi chú</Label>
          <Input name="description" placeholder="Nhập nội dung" className="mt-3" control={control} />
        </Field>
        {tabActive === 1 ? (
          <Field>
            <Label htmlFor="spend">Tiền chi</Label>
            <Input name="spend" placeholder="Nhập số tiền" className="mt-3" control={control} />
          </Field>
        ) : (
          <Field>
            <Label htmlFor="income">Tiền thu</Label>
            <Input name="income" placeholder="Nhập số tiền" className="mt-3" control={control} />
          </Field>
        )}
        <Field>
          <Label>Danh mục</Label>
          {tabActive === 1 ? <SpendCate /> : <IncomeCate />}
        </Field>
        <div className="mt-10">
          <Button type="submit">{tabActive === 1 ? 'Nhập khoảng chi' : 'Nhập khoảng thu'}</Button>
        </div>
      </form>
    </div>
  );
};

export default SpendingPage;
