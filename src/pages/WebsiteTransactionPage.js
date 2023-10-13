import React from "react";
import AccountService from "../Services/AccountService";
import { useState } from "react";
import FilterTransaction from "../Component/FilterTransaction";
import TableTransaction from "../Component/TableTransaction";
import { useParams } from "react-router";

const WebsiteTransactionPage = () => {
  const { id } = useParams();
  const [documentFilter, setDocumentFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  console.log(totalData);
  const handleData = (data, totalPage) => {
    // if (data !== undefined) {
    setDocumentFilter(data);
    // }
    setTotalPage(totalPage);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleTotalData = (data) => {
    setTotalData(data);
  };
  console.log(documentFilter);
  return (
    <div>
      <FilterTransaction
        purpose={"mainStatement"}
        handleData={handleData}
        page={page}
        handlePage={handlePage}
        handleTotalData={handleTotalData}
        api={AccountService.GetWebsiteStateMent}
        id={id}
      />
      <TableTransaction
        FilterData={documentFilter}
        purpose={"mainStatement"}
        handlePage={handlePage}
        page={page}
        totalPage={totalPage}
        totalData={totalData}
      />
    </div>
  );
};

export default WebsiteTransactionPage;
