import { CloseIcon, DeleteIcon, VisibilityIcon } from '@/components/icon/Icon';
import formatDateLimit from '@/helpers/formatDateLimit';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import useClickOutSide from '@/hooks/useClickOutSide';
import { deleteSpendlimit, getSpendlimit, updateSpendlimit } from '@/services/spendlimitService';
import { ISpendlimit } from '@/types/spendlimit.type';
import { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
const SpendTable = ({
  data,
  setSpendlimitData,
}: {
  data: ISpendlimit[];
  setSpendlimitData: React.Dispatch<React.SetStateAction<ISpendlimit[]>>;
}) => {
  const [spendlimitDetails, setSpendlimitDetails] = useState<ISpendlimit[]>([]);
  const [isEditItem, setIsEditItem] = useState<string | undefined>();
  const [spendlimitValue, setSpendlimitValue] = useState('');
  const { show, setShow, nodeRef } = useClickOutSide();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditItem]);

  const onSpendlimitDetail = async (id: string) => {
    const data = await getSpendlimit(id);
    data && setSpendlimitDetails(data);
    setShow(!show);
  };

  const handleDeleteSpendlimit = async (id: string) => {
    const isDelete = confirm('Bạn có muốn xoá danh mục hạn mức này không?');
    if (!isDelete) return;
    await deleteSpendlimit(id);
    setSpendlimitData(prevData => prevData.filter(item => item.category._id !== id));
    toast.success('Đã xoá danh mục hạn mức!');
  };

  const handleUpdateSpendlimit = async (id: string | undefined) => {
    if (Number.isNaN(+spendlimitValue)) {
      return toast.error('Vui lòng nhập số tiền hợp lệ!');
    }

    try {
      await updateSpendlimit(id, { moneylimit: +spendlimitValue });
      console.log(data);

      setSpendlimitDetails(prevData =>
        prevData.map(item => (item._id === id ? { ...item, moneylimit: +spendlimitValue } : item))
      );
      setIsEditItem(undefined);
      setSpendlimitValue(''); // Clear the input value after update
      toast.success('Cập nhật thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
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
                    onClick={() => onSpendlimitDetail(item.category._id)}
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
      <ReactModal
        isOpen={show}
        overlayClassName="modal-overlay fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        className="modal-content w-full max-w-[700px] bg-white rounded-xl outline-none relative dark:text-slate-800"
      >
        <div ref={nodeRef} className="p-10">
          <button className="absolute z-10 right-5 top-5 text-gray-500" onClick={() => setShow(!show)}>
            <CloseIcon />
          </button>
          <h2 className="text-center text-xl font-semibold">Chi tiết hạn mức danh mục</h2>
          <table className="min-w-full mt-10">
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Thời gian</th>
                <th>Hạn mức</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {spendlimitDetails?.length > 0 &&
                spendlimitDetails?.map(item => (
                  <tr className="text-center h-16" key={item._id}>
                    <td>
                      <div className="flex items-center justify-center gap-5">
                        <img src={`/icon/${item.category.icon}`} alt={`icon ${item.category.name}`} className="w-10" />
                        <span className="font-medium">{item.category.name}</span>
                      </div>
                    </td>
                    <td>{formatDateLimit(item.date)}</td>
                    <td>
                      {isEditItem === item._id ? (
                        <input
                          defaultValue={item.moneylimit}
                          className="outline-none border-2 rounded-md text-center p-1 w-[120px]"
                          ref={inputRef}
                          onChange={e => setSpendlimitValue(e.target.value)}
                        />
                      ) : (
                        formatMoneyUtils(item.moneylimit)
                      )}
                    </td>
                    <td>
                      {isEditItem === item._id ? (
                        <button
                          className="bg-blue-400 text-white px-4 py-2 rounded-md transition-all duration-300 ease-linear hover:bg-blue-500"
                          onClick={() => handleUpdateSpendlimit(item._id)}
                        >
                          Cập nhập
                        </button>
                      ) : (
                        <button
                          className="bg-yellow-400 text-white px-4 py-2 rounded-md transition-all duration-300 ease-linear hover:bg-yellow-500"
                          onClick={() => setIsEditItem(item._id)}
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </ReactModal>
    </>
  );
};

export default SpendTable;
