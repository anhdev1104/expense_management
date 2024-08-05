const Tab = ({ tabActive, onClick }: { tabActive: string; onClick: (typeCategory: string) => void }) => {
  return (
    <div className="mx-auto w-[240px] flex justify-evenly items-center mt-5 bg-gray-100 py-2 rounded-md dark:bg-gray-200/50">
      <button
        type="button"
        className={`dark:text-white cursor-pointer py-2 px-5 rounded-md transition-all duration-300 ease-in-out font-semibold ${
          tabActive === 'expense' ? 'bg-primary text-white' : 'text-primary'
        }`}
        onClick={() => onClick('expense')}
      >
        Tiền chi
      </button>
      <button
        type="button"
        className={`dark:text-white cursor-pointer py-2 px-5 rounded-md transition-all duration-300 ease-in-out font-semibold ${
          tabActive === 'income' ? 'bg-primary text-white' : 'text-primary'
        }`}
        onClick={() => onClick('income')}
      >
        Tiền thu
      </button>
    </div>
  );
};

export default Tab;
