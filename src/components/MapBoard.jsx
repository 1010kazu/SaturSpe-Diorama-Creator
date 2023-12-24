import React from "react";

export default function MapBoard() {
  const ROW = 11;
  const COL = 8;
  const horizontal_line = []
  const vertical_line = []
  const table = []
  for (let i = 0; i < COL; i++) {
    if (i === COL - 1) { horizontal_line.push({ id: `col-h-${i}`, className: "line-horizontal-end" }) }
    else { horizontal_line.push({ id: `col-h-${i}`, className: "line-horizontal" }) }
    vertical_line.push({
      idv: `col-v-${i}`, classNameVert: "line-vertical",
      ids: `col-s-${i}`, classNameSqre: "square"
    })
  }
  for (let i = 0; i < ROW; i++) {
    table.push({ idh: `row-h-${i}`, idv: `row-v-${i}`, className: "line-row" })
  }

  const click = e => {
    const id = e.target.id
    console.log(id)
    const ids = id.split('-')
    if(ids[1] === 'h'){console.log("ids[1] is h")}
    else if(ids[1] === 'v'){console.log("ids[1] is v")}
    else if(ids[1] === 's'){console.log("ids[1] is s")}
    else{console.log("ids[1] is error")}
  }

  return (
    <div className="table">
      {table.map((table,index) => (
        <div key={index}>
          <div id={table.idh} className={table.className}>
            {horizontal_line.map((horizontal) => (
              <div>
                <div id={horizontal.id} className={horizontal.className} onClick={click}></div>
              </div>
            ))}
          </div>
          <div id={table.idv} className={table.className}>
            {vertical_line.map((vertical) => (
              <>
                <div id={vertical.idv} className={vertical.classNameVert} onClick={click}></div>
                <div id={vertical.ids} className={vertical.classNameSqre} onClick={click}></div>
              </>
            ))}
            <div id="col-v-end" className="line-vertical-end" onClick={click}></div>
          </div>
        </div>
      ))}
      <div id="row-h-end" className="line-row" onClick={click}>
        {horizontal_line.map((horizontal, index) => (
          <div>
            <div key={horizontal.id} className={horizontal.className}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
