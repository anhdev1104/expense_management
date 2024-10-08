import { useMemo, useState } from 'react';
import Chart, { CategoryScale } from 'chart.js/auto';
import { PieChart } from '@/components/charts';
import { TransactionType } from '@/constants/transaction';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import { ITransaction } from '@/types/transaction.type';
import ReactModal from 'react-modal';
import { CloseIcon } from '@/components/icon/Icon';
import useClickOutSide from '@/hooks/useClickOutSide';
import { getTransactionDetails } from '@/services/transactionService';

Chart.register(CategoryScale);

const StatisticTable = ({ statisticData, dateSelect }: { statisticData: ITransaction[]; dateSelect: any }) => {
  // hàm nhóm dữ liệu theo danh mục
  const groupByCategory = (data: ITransaction[]) => {
    return data.reduce(
      (acc, item) => {
        const id = item.category._id;
        const categoryName = item.category?.name ?? 'Danh mục chưa xác định';
        const categoryIcon = item.category?.icon ?? 'default-icon.png';

        if (!acc[categoryName]) {
          acc[categoryName] = { _id: id, name: categoryName, icon: categoryIcon, money: 0 };
        }
        acc[categoryName].money += item.money;

        return acc;
      },
      {} as Record<
        string,
        {
          _id: string | null | undefined;
          name: string;
          icon: string;
          money: number;
        }
      >
    );
  };

  const dataExpense = useMemo(() => {
    const groupedData = groupByCategory(statisticData.filter(item => item.type === TransactionType.EXPENSE));
    statisticData;
    return Object.values(groupedData);
  }, [statisticData]);

  const dataIncome = useMemo(() => {
    const groupedData = groupByCategory(statisticData.filter(item => item.type === TransactionType.INCOME));
    return Object.values(groupedData);
  }, [statisticData]);

  const [tabActive, setTabActive] = useState<string>('expense');
  const [statisticDetails, setStatisticDetails] = useState<ITransaction[]>([]);
  const { show, setShow, nodeRef } = useClickOutSide();

  const chartSpendData = useMemo(
    () => ({
      labels: dataExpense.map(data => data.name),
      datasets: [
        {
          label: 'Chi',
          data: dataExpense.map(data => data.money),
          backgroundColor: [
            '#f3ba2f',
            '#2a71d0',
            '#f55fa0',
            '#c0c0c0',
            '#9c4422',
            '#368734',
            '#18896d',
            '#4f2f99',
            '#c0a822',
          ],
          borderColor: 'gray',
          borderWidth: 1,
        },
      ],
    }),
    [dataExpense]
  );

  const chartIncomeData = useMemo(
    () => ({
      labels: dataIncome.map(data => data.name),
      datasets: [
        {
          label: 'Thu',
          data: dataIncome.map(data => data.money),
          backgroundColor: ['#2dd340', '#2ad0cd', '#f17f88', '#758699', '#975742', '#1267f1'],
          borderColor: 'gray',
          borderWidth: 1,
        },
      ],
    }),
    [dataIncome]
  );

  const resultStatistic = tabActive === 'expense' ? dataExpense : dataIncome;
  const chartData = tabActive === 'expense' ? chartSpendData : chartIncomeData;

  const fetchStatisticDetails = async (idCategory: string | null | undefined) => {
    if (!idCategory) return;

    (async () => {
      const data = await getTransactionDetails(idCategory, dateSelect.month, dateSelect.year);
      data && setStatisticDetails(data);
      setShow(true);
    })();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1 cursor-pointer" onClick={() => setTabActive('expense')}>
          <span
            className={`border-b-2 ${
              tabActive === 'expense' ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Chi tiêu
          </span>
        </div>
        <div data-id={2} className="flex-1 cursor-pointer" onClick={() => setTabActive('income')}>
          <span
            className={`border-b-2 ${
              tabActive === 'income' ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Thu nhập
          </span>
        </div>
      </div>
      <div className="mt-4">
        {chartData.labels.length <= 0 ? (
          <div className="p-5 rounded-md bg-primary text-white text-center font-bold my-10">Chưa có dữ liệu</div>
        ) : (
          <PieChart tab={tabActive} chartData={chartData} />
        )}
      </div>

      <div className="border-t border-gray-300 mt-5">
        {resultStatistic.length > 0 &&
          resultStatistic.map(item => (
            <div
              className="flex justify-between items-center py-2 px-5 border border-t-transparent border-borderColor cursor-pointer hover:bg-gray-100 transition-all"
              key={item._id}
              onClick={() => fetchStatisticDetails(item._id)}
            >
              <div className="flex items-center gap-5">
                <img src={`/icon/${item.icon}`} alt={`icon ${item.name}`} className="w-10" />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="font-medium">{formatMoneyUtils(item.money) || 0}</span>
            </div>
          ))}
      </div>
      <ReactModal
        isOpen={show}
        overlayClassName="modal-overlay fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        className="modal-content w-full max-w-[750px] bg-white rounded-xl outline-none relative dark:text-slate-800"
      >
        <div className="p-10 max-h-[450px] overflow-y-scroll" ref={nodeRef}>
          <button className="absolute z-10 right-5 top-5 text-gray-500" onClick={() => setShow(false)}>
            <CloseIcon />
          </button>
          <h2 className="text-center text-xl font-semibold">Báo cáo chi tiết chi tiêu trong tháng</h2>
          <table className="min-w-full mt-10">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên danh mục</th>
                <th>Thời gian</th>
                <th>Số tiền</th>
                <th>Ghi chú</th>
                <th>Loại</th>
              </tr>
            </thead>
            <tbody>
              {statisticDetails.length > 0 &&
                statisticDetails.map((item, index) => (
                  <tr className="text-center h-16" key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center justify-center gap-5">
                        <img src={`/icon/${item.category.icon}`} alt={`icon ${item.category.name}`} className="w-10" />
                        <span className="font-medium">{item.category.name}</span>
                      </div>
                    </td>
                    <td>{new Date(item.date).toLocaleDateString('vi-VI')}</td>
                    <td>{formatMoneyUtils(item.money)}</td>
                    <td>
                      <div className="max-w-[200px] leading-6 text-center w-full mx-auto">{item.description}</div>
                    </td>
                    <td>{item.type === TransactionType.EXPENSE ? 'Chi tiêu' : 'Thu nhập'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </ReactModal>
    </>
  );
};

export default StatisticTable;
