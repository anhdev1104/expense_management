import DatePickerCustom from '@/components/date/DatePickerCustom';
import Field from '@/components/field';

const StatisticDate = ({ control }: { control: any }) => {
  return (
    <>
      <Field>
        <DatePickerCustom control={control} isDefaultValue />
      </Field>
      <Field>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Chi tiêu</span>
            <span className="text-red-500 font-bold">-1.100.000đ</span>
          </div>
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Thu nhập</span>
            <span className="text-green-500 font-bold">+5.600.000đ</span>
          </div>
        </div>
      </Field>
      <Field>
        <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
          <span>Thu chi</span>
          <span className="text-xl font-bold">+4.500.000đ</span>
        </div>
      </Field>
    </>
  );
};

export default StatisticDate;
