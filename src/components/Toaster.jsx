import { Toaster } from 'react-hot-toast';

const CustomToaster = () => (
  <Toaster
    position="bottom-center"
    toastOptions={{
      className: '!bg-gray-800 !text-white dark:!bg-gray-100 dark:!text-gray-900',
      duration: 4000,
      success: {
        iconTheme: {
          primary: '#06b6d4', // cyan-500
          secondary: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444', // red-500
          secondary: '#fff',
        },
      },
    }}
  />
);

export default CustomToaster;