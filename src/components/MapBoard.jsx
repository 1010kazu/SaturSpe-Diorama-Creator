import React, {useState} from "react";

export default function MapBoard() {
  const ROW = 11;
  const COL = 8;
  const horizontal_line_end = new Array(COL).fill(null).map((_,index) => (index === COL-1 ? 
    { idh: `col-h-${index}`, classNameHori: "line-horizontal-end", idl: `col-l-${index}`, classNameLine: "line-object-horizontal-init" }: { idh: `col-h-${index}`, classNameHori: "line-horizontal", idl: `col-l-${index}`, classNameLine: "line-object-horizontal-init"}));
  const tableInit = new Array(ROW).fill(null).map((_,row_index) => (
    { idr: `row-${row_index}`, className: "line-row", 
    row_h: new Array(COL).fill(null).map((_,index) => (index === COL-1 ? 
      { idh: `col-h-${row_index}-${index}`, classNameHori: "line-horizontal-end", idl: `col-l-${row_index}-${index}`, classNameLine: "line-object-horizontal-init"}: { idh: `col-h-${row_index}-${index}`, classNameHori: "line-horizontal", idl: `col-l-${row_index}-${index}`, classNameLine: "line-object-horizontal-init" })), 
    row_v: new Array(COL).fill(null).map((_,index) => (
      { idv: `col-v-${row_index}-${index}`, classNameVert: "line-vertical",  ids: `col-s-${row_index}-${index}`, classNameSqre: "square", idl: `col-l-${row_index}-${index}`, classNameLine: "line-object-vertical-init"}))}
  ));
  const [table, setTable] = useState(tableInit)
  const [objSS, setObjSS] = useState("square")
  const [objLL, setObjLL] = useState("init")
  const [mode, setMode] = useState("s")

  const drawmap = e => {
    const id = e.target.id
    console.log(id)
    const ids = id.split('-')
    if(ids[1] === 'h' || ids[1] === 'l'){
      console.log("ids[1] is h")
      const objCName = `line-object-horizontal-${objLL}`
      setTable(
        table.map((row,row_index) => (row_index === Number(ids[2]) ? 
        row = { idr: `row-${row_index}`, className: "line-row",
          row_h: row.row_h.map((col,col_index) => (col_index === Number(ids[3])?
            col ={ idh: `col-h-${row_index}-${col_index}`, classNameHori: "line-horizontal", idl: `col-l-${row_index}-${col_index}`, classNameLine: `${objCName}` } : col)),
          row_v: row.row_v
        }:
        row))
      )
      
      console.log(table)
    }
    else if(ids[1] === 'v'){console.log("ids[1] is v")}
    else if(ids[1] === 's'){
      console.log("ids[1] is s")
      const objCName = objSS
      setTable(
        table.map((row,row_index) => (row_index === Number(ids[2]) ? 
        row = { idr: `row-${row_index}`, className: "line-row",
          row_h: row.row_h,
          row_v: row.row_v.map((col,col_index) => (col_index === Number(ids[3]) ?
            col = {idv: `col-v-${row_index}-${col_index}`, classNameVert: "line-vertical",  ids: `col-s-${row_index}-${col_index}`, classNameSqre: `${objCName}`, idl: `col-l-${row_index}-${col_index}`, classNameLine: "line-object-vertical-init"} : col))} 
          : row))
      )
    }
    else{console.log("ids[1] is error")}
  }
  
  return (
    <>
    <div>
      <button className="button" type="button" onClick={() =>setMode("s")}>マス</button>
      <button className="button" type="button" onClick={() =>setMode("l")}>線</button>
    </div>
    {(mode === "s"? 
    <div>
      <button className="button" type="button" onClick={() =>setObjSS("obstacle")}>三角</button>
      <button className="button" type="button" onClick={() =>setObjSS("square")}>キャンセル</button>
    </div>
    :<div>
      <button className="button" type="button" onClick={() =>setObjLL("circle")}>丸</button>
      <button className="button" type="button" onClick={() =>setObjLL("init")}>キャンセル</button>
    </div>)}

    <div className="table">
      {table.map((table,index) => (
        <div key={index}>
          <div id={table.idh} className={table.className}>
            {table.row_h.map((horizontal) => (
              <div>
                <div id={horizontal.idh} className={horizontal.classNameHori} onClick={drawmap}><div id={horizontal.idl} className={horizontal.classNameLine}></div></div>
              </div>
            ))}
          </div>
          <div id={table.idv} className={table.className}>
            {table.row_v.map((vertical) => (
              <>
                <div id={vertical.idv} className={vertical.classNameVert} onClick={drawmap}><div id={vertical.idl} className={vertical.classNameLine}></div></div>
                <div id={vertical.ids} className={vertical.classNameSqre} onClick={drawmap}></div>
              </>
            ))}
            <div id="col-v-end" className="line-vertical-end" onClick={drawmap}><div id="col-v-end" className="line-object-vertical"></div></div>
          </div>
        </div>
      ))}
      <div id="row-h-end" className="line-row" onClick={drawmap}>
        {horizontal_line_end.map((horizontal) => (
          <div >
            <div id={horizontal.id} className={horizontal.classNameHori}>
            <div id={horizontal.idl} className={horizontal.classNameLine}></div></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
