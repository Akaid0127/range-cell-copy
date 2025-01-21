import React from 'react';
import styles from './App.module.css';
import { Button, Table } from 'antd';

const defaultTableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
  { title: 'Describe', dataIndex: 'describe', key: 'describe', width: 100 },
  { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 100 },
  { title: 'Email', dataIndex: 'email', key: 'email', width: 100 },
];

const App: React.FC = () => {
  // 获取数据
  const handleGetData = () => {};

  // 清空数据
  const handleClearData = () => {};

  return (
    <>
      <div className={styles.rangeCopyWrapper}>
        <div className={styles.optContent}>
          <Button onClick={handleGetData}>获取数据</Button>
          <Button onClick={handleClearData}>清空数据</Button>
        </div>
        <div className={styles.tableContent}>
          <Table
            bordered
            size="small"
            columns={defaultTableColumns}
            scroll={{ x: 800, y: 600 }}
          />
        </div>
      </div>
    </>
  );
};

export default App;
