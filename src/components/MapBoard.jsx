import React, {useState} from "react";

export default function MapBoard() {
  const ROW = 11;
  const COL = 8;
  const horizontal_line_end = new Array(COL).fill(null).map((_,index) => (index === COL-1 ? { idh: `col-h-${index}`, classNameHori: "line-horizontal-end" }: { idh: `col-h-${index}`, classNameHori: "line-horizontal" }));
  const tableInit = new Array(ROW).fill(null).map((_,row_index) => (
    { idr: `row-${row_index}`, className: "line-row", 
    row_h: new Array(COL).fill(null).map((_,index) => (index === COL-1 ? { idh: `col-h-${row_index}-${index}`, classNameHori: "line-horizontal-end" }: { idh: `col-h-${row_index}-${index}`, classNameHori: "line-horizontal" })), 
    row_v: new Array(COL).fill(null).map((_,index) => ({ idv: `col-v-${row_index}-${index}`, classNameVert: "line-vertical",  ids: `col-s-${row_index}-${index}`, classNameSqre: "square"}))}
  ));
  const [table, setTable] = useState(tableInit)
  const [objSS, setObjSS] = useState("square")

  const drawmap = e => {
    const id = e.target.id
    console.log(id)
    const ids = id.split('-')
    if(ids[1] === 'h'){console.log("ids[1] is h")}
    else if(ids[1] === 'v'){console.log("ids[1] is v")}
    else if(ids[1] === 's'){
      console.log("ids[1] is s")
      const objCName = objSS
      setTable(
        table.map((row,row_index) => (row_index === Number(ids[2]) ? 
        row = { idr: `row-${row_index}`, className: "line-row",
          row_h: row.row_h,
          row_v: row.row_v.map((col,col_index) => (col_index === Number(ids[3]) ?
            col = {idv: `col-v-${row_index}-${col_index}`, classNameVert: "line-vertical",  ids: `col-s-${row_index}-${col_index}`, classNameSqre: `${objCName}`} : col))} 
          : row))
      )
    }
    else{console.log("ids[1] is error")}
  }
  
  return (
    <>
    <button className="button" type="button" onClick={() =>setObjSS("obstacle")}>障害物</button>
    <button className="button" type="button" onClick={() =>setObjSS("square")}>キャンセル</button>
    
    <div className="table">
      {table.map((table,index) => (
        <div key={index}>
          <div id={table.idh} className={table.className}>
            {table.row_h.map((horizontal) => (
              <div>
                <div id={horizontal.idh} className={horizontal.classNameHori} onClick={drawmap}></div>
              </div>
            ))}
          </div>
          <div id={table.idv} className={table.className}>
            {table.row_v.map((vertical) => (
              <>
                <div id={vertical.idv} className={vertical.classNameVert} onClick={drawmap}></div>
                <div id={vertical.ids} className={vertical.classNameSqre} onClick={drawmap}></div>
              </>
            ))}
            <div id="col-v-end" className="line-vertical-end" onClick={drawmap}></div>
          </div>
        </div>
      ))}
      <div id="row-h-end" className="line-row" onClick={drawmap}>
        {horizontal_line_end.map((horizontal) => (
          <div>
            <div key={horizontal.id} className={horizontal.classNameHori}></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
