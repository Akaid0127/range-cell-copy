import React, { useEffect, useState } from 'react';
import { Button, message, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import styles from './App.module.css';

interface ITableRecord {
  id: string;
  name: string;
  age: string;
  address: string;
  describle: string;
  phone: string;
  email: string;
}

type ColumnTypes = TableProps<ITableRecord>['columns'];

interface IMousePoint {
  startCol: number;
  startRow: number;
  endCol: number;
  endRow: number;
}

const defaultTableColumns: ColumnTypes = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 50 },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
  { title: 'Describe', dataIndex: 'describe', key: 'describe', width: 100 },
  { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 100 },
  { title: 'Email', dataIndex: 'email', key: 'email', width: 100 },
];

// 格式化对象数组
function convertValueToString(arr: any[]) {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    for (let key in obj) {
      if (typeof obj[key] !== 'string') {
        obj[key] = obj[key].toString();
      }
    }
  }
  return arr;
}

// 框选的起止节点
let mousePoint: IMousePoint = {
  startCol: -1,
  startRow: -1,
  endCol: -1,
  endRow: -1,
};

const CustomizedTableCell: React.FC<React.PropsWithChildren> = (props: any) => {
  const { onMouseEnter, onMouseLeave, ...restProps } = props;

  const handleMouseDown = (event: MouseEvent) => {
    const tdElement = event.target as HTMLTableCellElement;
    const trElement = tdElement.parentElement as HTMLTableRowElement;
    const tbodyElement = trElement.parentElement as HTMLTableSectionElement;
    console.dir(tbodyElement);
  };

  const handleMouseEnter = (event: MouseEvent) => {};

  const handleMouseUp = (event: MouseEvent) => {};

  const changeMousePoint = () => {};

  const renderRangeCells = () => {};

  return (
    <td
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...restProps}
    >
      {restProps.children}
    </td>
  );
};

const App: React.FC = () => {
  const [tableRecords, setTableRecords] = useState<ITableRecord[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnTypes>([]);

  useEffect(() => {
    setTableColumns(defaultTableColumns);
  }, []);

  // 获取数据
  const handleGetData = () => {
    axios
      .get('/table/list')
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          const resData = res.data.list;
          console.log(resData);
          setTableRecords(
            convertValueToString([...resData]).map((item: any) => {
              return {
                key: item.id,
                ...item,
              };
            })
          );
        } else {
          message.error(res.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // 清空数据
  const handleClearData = () => {
    setTableRecords([]);
  };

  // 覆盖默认的 table 元素
  const customizedTable = {
    body: {
      cell: CustomizedTableCell,
    },
  };

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
            dataSource={tableRecords}
            columns={tableColumns}
            scroll={{ x: 800, y: 600 }}
            pagination={false}
            components={customizedTable}
          />
        </div>
      </div>
    </>
  );
};

export default App;
