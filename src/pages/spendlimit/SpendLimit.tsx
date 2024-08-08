import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import SpendCate from '../spending/components/SpendCate';
import Button from '@/components/button';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICategory } from '@/types/category.type';
import { getAllCategory } from '@/services/categoryService';
import DatePickerCustom from '@/components/date/DatePickerCustom';
import { ISpendlimit } from '@/types/spendlimit.type';
import { addSpendlimit, getSpendlimit } from '@/services/spendlimitService';
import SpendTable from './components/SpendTable';

const schema = yup
  .object({
    date: yup.date().required('Vui lòng chọn tháng!'),
    moneylimit: yup
      .number()
      .typeError('Vui lòng nhập số tiền hợp lệ !')
      .required('Vui lòng nhập số tiền hạn mức chi tiêu !'),
    category: yup.string().required('Vui lòng chọn danh mục !'),
  })
  .required();

const SpendLimit = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
    reset,
  } = useForm<ISpendlimit | any>({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState<ICategory[]>([]);
  const [resetCate, setResetCate] = useState<boolean>(false);
  const [spendlimitData, setSpendlimitData] = useState<ISpendlimit[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getSpendlimit();
      if (data) {
        const uniqueData = data
          .reduce((acc: any, current: any) => {
            acc.set(current.category._id, current);
            return acc;
          }, new Map())
          .values();

        setSpendlimitData(Array.from(uniqueData));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dataCategory = await getAllCategory('expense');
      dataCategory && setCategory(dataCategory);
    })();
  }, []);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(String(arrErrors[0]?.message));
    }
  }, [errors]);

  const handleSpendLimit: SubmitHandler<ISpendlimit> = async (values: any) => {
    const newSpendlimit = await addSpendlimit(values);
    const data = [...spendlimitData, newSpendlimit];
    const uniqueData = data
      .reduce((acc, current) => {
        acc.set(current.category._id, current);
        return acc;
      }, new Map())
      .values();

    setSpendlimitData(Array.from(uniqueData));
    toast.success('Thêm hạn mức thành công.');
    reset();
    setResetCate(!resetCate);
  };

  return (
    <div className="mt-[120px] mb-20 grid grid-cols-2">
      <form action="" className="max-w-[700px] w-full mx-auto pl-10 pr-5" onSubmit={handleSubmit(handleSpendLimit)}>
        <Field>
          <DatePickerCustom control={control} isView />
        </Field>
        <Field>
          <Label htmlFor="moneylimit">Đặt hạn mức</Label>
          <Input name="moneylimit" className="mt-3" placeholder="Nhập số tiền giới hạn chi tiêu" control={control} />
        </Field>
        <Field>
          <Label>Danh mục</Label>
          <SpendCate category={category} setValue={setValue} control={control} resetCate={resetCate} />
        </Field>
        <div className="mt-10">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            Thiết lập hạn mức
          </Button>
        </div>
      </form>
      <div className="pr-10 pl-5">
        <SpendTable data={spendlimitData} setSpendlimitData={setSpendlimitData} />
      </div>
    </div>
  );
};

export default SpendLimit;
