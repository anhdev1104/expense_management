import React, { useEffect, useState } from 'react';
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
  date: Date;
  spend: number;
  description?: string;
  catespend: string;
}

const schema = yup
  .object({
    date: yup.date().required('Vui lòng chọn ngày!'),
    spend: yup.number().typeError('Vui lòng nhập số tiền hợp lệ!').required('Vui lòng nhập tiền chi !'),
    catespend: yup.string().required('Vui lòng chọn danh mục !'),
  })
  .required();

const SpendingPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
    reset,
  } = useForm<IFormSpend>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [tabActive, setTabActive] = useState<number>(1);
  useEffect(() => {
    const arrErrors = Object.values(errors);

    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setTabActive(id);
  };

  const onSpendingHandler: SubmitHandler<IFormSpend> = values => {
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
          {tabActive === 1 ? <SpendCate setValue={setValue} control={control} /> : <IncomeCate />}
        </Field>
        <div className="mt-10">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {tabActive === 1 ? 'Nhập khoảng chi' : 'Nhập khoảng thu'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpendingPage;
