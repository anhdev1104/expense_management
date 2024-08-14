import { DeleteIcon, VisibilityIcon } from '@/components/icon/Icon';
import { deleteSpendlimitData, getSpendlimitData, toggleModal } from '@/redux/slices/spendlimitSlice';
import { AppDispatch } from '@/redux/store';
import { ISpendlimit } from '@/types/spendlimit.type';
import { useDispatch } from 'react-redux';

const SpendTable = ({
  data,
  setSpendlimitData,
}: {
  data: ISpendlimit[];
  setSpendlimitData: React.Dispatch<React.SetStateAction<ISpendlimit[]>>;
}) => {
  const dispatch = useDispatch();
  const dispatchApp = useDispatch<AppDispatch>();

  const onSpendlimitDetails = (id: string) => {
    dispatchApp(getSpendlimitData(id));
    dispatch(toggleModal());
  };

  const handleDeleteSpendlimit = (id: string) => {
    const isDelete = confirm('Bạn có muốn xoá danh mục hạn mức này không ?');
    if (!isDelete) return;
    dispatchApp(deleteSpendlimitData(id));
    setSpendlimitData(prevData => prevData.filter(item => item.category._id !== id));
  };

  return (
    <>
      <h1 className="mb-5 text-center font-bold text-2xl text-slate-600 dark:text-white">Danh sách hạn mức chi tiêu</h1>
      <div className="mx-auto border-t border-gray-300">
        {data.length > 0 &&
          data
            .map(item => (
              <div
                className="flex justify-between items-center py-2 px-5 border border-t-transparent border-borderColor"
                key={item._id}
              >
                <div className="flex items-center gap-5">
                  <img src={`/icon/${item.category.icon}`} alt={`icon ${item.category}`} className="w-10" />
                  <span className="font-medium">{item.category.name}</span>
                </div>
                <div className="flex gap-3">
                  <div
                    className="bg-blue-500 px-3 py-2 flex items-center justify-center text-white rounded-md transition-all duration-300 ease-linear hover:bg-blue-400 cursor-pointer"
                    title="chi tiết"
                    onClick={() => onSpendlimitDetails(item.category._id)}
                  >
                    <VisibilityIcon />
                  </div>
                  <div
                    className="bg-red-500 px-3 py-2 flex items-center justify-center text-white rounded-md transition-all duration-300 ease-linear hover:bg-red-400 cursor-pointer"
                    title="xoá"
                    onClick={() => handleDeleteSpendlimit(item.category._id)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ))
            .reverse()}
      </div>
    </>
  );
};

export default SpendTable;
