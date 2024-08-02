import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Tab from './components/Tab';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import SpendCate from './components/SpendCate';
import Button from '@/components/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import DatePickerCustom from '@/components/date/DatePickerCustom';
import { ICategory } from '@/types/category.type';
import { getAllCategory } from '@/services/categoryService';
import { addTransaction } from '@/services/transactionService';
import { ITransaction } from '@/types/transaction.type';

const schema = yup
  .object({
    date: yup.date().required('Vui lòng chọn ngày!'),
    money: yup.number().typeError('Vui lòng nhập số tiền hợp lệ!').required('Vui lòng nhập tiền chi !'),
    category: yup.string().required('Vui lòng chọn danh mục !'),
  })
  .required();

const SpendingPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
    reset,
  } = useForm<ITransaction | any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [tabActive, setTabActive] = useState<string>('expense');
  const [category, setCategory] = useState<ICategory[]>([]);
  const [resetCate, setResetCate] = useState<boolean>(false);

  useEffect(() => {
    const arrErrors = Object.values(errors);

    if (arrErrors.length > 0 && arrErrors[0]?.message) {
      toast.error(String(arrErrors[0].message));
    }
  }, [errors]);

  useEffect(() => {
    (async () => {
      const categoryData = await getAllCategory(tabActive);
      categoryData && setCategory(categoryData);
    })();
  }, [tabActive]);

  const handleActiveTab = (typeCategory: string) => {
    setTabActive(typeCategory);
  };

  const onSpendingHandler: SubmitHandler<ITransaction> = async values => {
    const { date, ...rest } = values;
    const formatDate = format(date, 'd/M/yyyy');
    const newTransaction = { ...rest, type: tabActive, date: formatDate };
    await addTransaction(newTransaction);
    reset();
    setResetCate(!resetCate);
  };

  return (
    <div className="mt-[120px] mb-20">
      <Tab tabActive={tabActive} onClick={handleActiveTab} />
      <form className="mt-5 w-[700px] px-10 mx-auto" autoComplete="off" onSubmit={handleSubmit(onSpendingHandler)}>
        <Field>
          <DatePickerCustom control={control} />
        </Field>
        <Field>
          <Label htmlFor="description">Ghi chú</Label>
          <Input name="description" placeholder="Nhập nội dung" className="mt-3" control={control} />
        </Field>
        <Field>
          <Label htmlFor="money">{tabActive === 'expense' ? 'Tiền chi' : 'Tiền thu'}</Label>
          <Input name="money" placeholder="Nhập số tiền" className="mt-3" control={control} />
        </Field>
        <Field>
          <Label>Danh mục</Label>
          <SpendCate category={category} setValue={setValue} control={control} resetCate={resetCate} />
        </Field>
        <div className="mt-10">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {tabActive === 'expense' ? 'Nhập khoảng chi' : 'Nhập khoảng thu'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpendingPage;
