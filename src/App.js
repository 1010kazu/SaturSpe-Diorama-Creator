import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import bombImg from './img/bomb.png';
import damageImg from './img/damage.png';
import escapeImg from './img/escape.png';
import homeImg from './img/home.png';
import hourakuImg from './img/houraku.png';
import narakuImg from './img/naraku.png';
import shogaiImg from './img/shogai.png';
import shomeiImg from './img/shomei.png';
import slipDownLeftImg from './img/slip_down_left.png';
import slipDownRightImg from './img/slip_down_right.png';
import slipDownImg from './img/slip_down.png';
import slipLeftRightImg from './img/slip_left_right.png';
import slipLeftImg from './img/slip_left.png';
import slipRightImg from './img/slip_right.png';
import slipUpDownImg from './img/slip_up_down.png';
import slipUpLeftImg from './img/slip_up_left.png';
import slipUpRightImg from './img/slip_up_right.png';
import slipUpImg from './img/slip_up.png';
import wallImg from './img/wall.png';
import warpImg from './img/warp.png';

const App = () => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentCells, setCurrentCells] = useState([]);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const handleObjectClick = (event) => {
        if(event.target.classList.contains('object-icon')){
            event.target = event.currentTarget;
        }
        if (selectedObject) {
            setSelectedObject(null);
            selectedObject.classList.remove('selected');
            if(selectedObject !== event.target){
                setSelectedObject(event.target);
                event.target.classList.add('selected');
            }
        } else {
            setSelectedObject(event.target);
            event.target.classList.add('selected');
        }
    };

    const handleCellClick = (event, cell) => {
        if (selectedObject) {
            const type = selectedObject.dataset.type;
            if (type === '壁' || type === '退路') {
                toggleWall(event, cell);
            } else if (type === '奈落') {
                cell.style.backgroundColor = cell.style.backgroundColor === 'gray' ? 'white' : 'gray';
            } else if (type === '崩落') {
                toggleCollapse(cell);
            } else {
                toggleObject(cell);
            }
        }
    };

    const toggleObject = (cell) => {
        let img;
        cell.style.backgroundColor = 'white'
        if (cell.querySelector('div')) {
            console.log("div clicked");
        }
        if (cell.querySelector('img')) {
            cell.textContent = '';
            cell.innerHTML = '';
            return;
        }
        else if (selectedObject.dataset.type === '障害') {
            img = document.createElement('img');
            img.src = shogaiImg;
        }
        else if (selectedObject.dataset.type === '照明') {
            img = document.createElement('img');
            img.src = shomeiImg;
        }
        else if (selectedObject.dataset.type === '拠点') {
            img = document.createElement('img');
            img.src = homeImg;
        }
        else if (selectedObject.dataset.type === 'ダメ') {
            img = document.createElement('img');
            img.src = damageImg;
        }
        else if (selectedObject.dataset.type === '爆発') {
            img = document.createElement('img');
            img.src = bombImg;
        }
        else if (selectedObject.dataset.type === 'ワプ') {
            img = document.createElement('img');
            img.src = warpImg;
        }

        if (img) {
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.userSelect = 'none';
            img.draggable = false;
            cell.append(img);
        } else {
            console.log("else selected Object")
        }
    };

    const toggleCollapse = (cell) => {
        if (cell.textContent) {
            cell.textContent = '';
            const numberLabel = cell.querySelector('div');
            if (numberLabel) {
                cell.removeChild(numberLabel);
            }
        } else {
            const collapseNumber = document.getElementById('collapse-number').value;
            cell.textContent = '';
            const img = document.createElement('img');
            img.src = hourakuImg;
            img.style.width = '100%';
            img.style.height = '100%';
            img.draggable = false;
            cell.appendChild(img);

            const numberLabel = document.createElement('div');
            numberLabel.style.position = 'absolute';
            numberLabel.style.bottom = '-5px';
            numberLabel.style.right = '0px';
            numberLabel.style.fontSize = '12px';
            numberLabel.textContent = collapseNumber;
            cell.appendChild(numberLabel);
        }
    };

    const toggleWall = (event, cell) => {
        const rect = cell.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let wallClass = '';
        let edgeClass = '';

        if (y < 10) {
            wallClass = 'wall-top';
            edgeClass = 'edge-top';
        } else if (x > rect.width - 10) {
            wallClass = 'wall-right';
            edgeClass = 'edge-right';
        } else if (y > rect.height - 10) {
            wallClass = 'wall-bottom';
            edgeClass = 'edge-bottom';
        } else if (x < 10) {
            wallClass = 'wall-left';
            edgeClass = 'edge-left';
        }

        if (wallClass) {
            if (selectedObject.dataset.type === '壁') {
                const existingWall = cell.querySelector(`.${wallClass}`);
                if (existingWall) {
                    cell.removeChild(existingWall);
                } else {
                    const wall = document.createElement('div');
                    wall.classList.add(wallClass);
                    cell.appendChild(wall);
                }
            } else if (selectedObject.dataset.type === '退路') {
                const existingEdge = cell.querySelector(`.${edgeClass}`);
                if (existingEdge) {
                    cell.removeChild(existingEdge);
                } else {
                    const edge = document.createElement('div');
                    edge.classList.add('edge-label', edgeClass);
                    edge.textContent = 'E';
                    edge.style.userSelect = 'none';
                    cell.appendChild(edge);
                }
            }
        }
    };

    const handleMouseDown = (event) => {
        if (selectedObject && selectedObject.dataset.type === '矢印') {
            setIsDrawing(true);
            const cell = event.target;
            setCurrentCells([cell]);
            setLastX(event.clientX);
            setLastY(event.clientY);
        }
    };

    const handleMouseMove = (event) => {
        if (isDrawing) {
            const cell = document.elementFromPoint(event.clientX, event.clientY);
            if (cell && cell.classList.contains('cell') && !currentCells.includes(cell)) {
                const previousCell = currentCells[currentCells.length - 1];
                const twoCellsBack = currentCells.length > 1 ? currentCells[currentCells.length - 2] : null;

                setCurrentCells([...currentCells, cell]);
                const deltaX = event.clientX - lastX;
                const deltaY = event.clientY - lastY;

                if (twoCellsBack) {
                    handleTwoCellsBack(twoCellsBack, previousCell, cell);
                } else {
                    handleSingleCell(previousCell, cell, deltaX, deltaY);
                }

                setLastX(event.clientX);
                setLastY(event.clientY);
            }
        }
    };

    const handleMouseUp = (event) => {
        if (isDrawing) {
            setIsDrawing(false);
            setCurrentCells([]);
        }
    };

    const handleTwoCellsBack = (twoCellsBack, previousCell, cell) => {
        const [twoCellsBackX, twoCellsBackY] = getCellCenter(twoCellsBack);
        const [previousCellX, previousCellY] = getCellCenter(previousCell);
        const [cellX, cellY] = getCellCenter(cell);

        const img = document.createElement('img');
        const previousImg = document.createElement('img');

        if (twoCellsBackX < previousCellX) {
            if (cellY > previousCellY) {
                previousImg.src = slipDownLeftImg;
                img.src = slipDownImg;
            } else if (cellY < previousCellY) {
                previousImg.src = slipUpLeftImg;
                img.src = slipUpImg;
            } else {
                previousImg.src = slipLeftRightImg;
                img.src = slipRightImg;
            }
        } else if (twoCellsBackX > previousCellX) {
            if (cellY > previousCellY) {
                previousImg.src = slipDownRightImg;
                img.src = slipDownImg;
            } else if (cellY < previousCellY) {
                previousImg.src = slipUpRightImg;
                img.src = slipUpImg;
            } else {
                previousImg.src = slipLeftRightImg;
                img.src = slipLeftImg;
            }
        } else if (twoCellsBackY > previousCellY) {
            if (cellX > previousCellX) {
                previousImg.src = slipDownRightImg;
                img.src = slipRightImg;
            } else if (cellX < previousCellX) {
                previousImg.src = slipDownLeftImg;
                img.src = slipLeftImg;
            } else {
                previousImg.src = slipUpDownImg;
                img.src = slipUpImg;
            }
        } else if (twoCellsBackY < previousCellY) {
            if (cellX > previousCellX) {
                previousImg.src = slipUpRightImg;
                img.src = slipRightImg;
            } else if (cellX < previousCellX) {
                previousImg.src = slipUpLeftImg;
                img.src = slipLeftImg;
            } else {
                previousImg.src = slipUpDownImg;
                img.src = slipDownImg;
            }
        } else {
            console.log("twoCellsBack is else.");
        }
        if (previousCell.querySelector('img')) {
            previousCell.textContent = '';
            previousCell.innerHTML = '';
        }
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.userSelect = 'none';
        img.draggable = false;
        previousImg.style.width = '100%';
        previousImg.style.height = '100%';
        previousImg.style.userSelect = 'none';
        previousImg.draggable = false;
        cell.appendChild(img);
        previousCell.appendChild(previousImg);
    };

    const handleSingleCell = (previousCell, cell, deltaX, deltaY) => {
        const img = document.createElement('img');
        const previousImg = document.createElement('img');
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            previousImg.src = slipLeftRightImg;
            img.src = deltaX > 0 ? slipRightImg : slipLeftImg;
        } else {
            previousImg.src = slipUpDownImg;
            img.src = deltaY > 0 ? slipDownImg : slipUpImg;
        }
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.userSelect = 'none';
        img.draggable = false;
        previousImg.style.width = '100%';
        previousImg.style.height = '100%';
        previousImg.style.userSelect = 'none';
        previousImg.draggable = false;
        cell.appendChild(img);
        previousCell.appendChild(previousImg);
    };

    const getCellCenter = (cell) => {
        const rect = cell.getBoundingClientRect();
        return [rect.left + rect.width / 2, rect.top + rect.height / 2];
    };

    const onClickExport = () => {
        const target = document.getElementById("map");
        html2canvas(target).then((canvas) => {
            const targetImgUri = canvas.toDataURL("image/png");
            saveAsImage(targetImgUri);
        });
    };

    const saveAsImage = (uri) => {
        const downloadLink = document.createElement("a");
        console.log(downloadLink)
        if (typeof downloadLink.download === "string"){
            downloadLink.href = uri;
            downloadLink.download = "diorama.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            // console.log("not")
            // window.open(uri);
        }
    }


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>ジオラマエディタ</h1>
            <div id="container">
                <div
                    id="map"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}

                >
                    {Array.from({ length: 88 }).map((_, index) => (
                        <div
                            key={index}
                            className="cell"
                            onClick={(event) => handleCellClick(event, event.currentTarget)}
                        ></div>
                    ))}
                </div>
                <div id="object-list">
                    <div className="object" data-type="障害" onClick={handleObjectClick}>
                        <img draggable = "false" src={shogaiImg} alt="障害" className="object-icon" />障害物
                    </div>
                    <div className="object" data-type="照明" onClick={handleObjectClick}>
                        <img draggable = "false" src={shomeiImg} alt="照明" className="object-icon" />照明</div>
                    <div className="object" data-type="拠点" onClick={handleObjectClick}>
                        <img draggable = "false" src={homeImg} alt="拠点" className="object-icon" />拠点</div>
                    <div className="object" data-type="ダメ" onClick={handleObjectClick}>
                        <img draggable = "false" src={damageImg} alt="ダメ" className="object-icon" />ダメージ源</div>
                    <div className="object" data-type="爆発" onClick={handleObjectClick}>
                        <img draggable = "false" src={bombImg} alt="爆発" className="object-icon" />爆発物</div>
                    <div className="object" data-type="ワプ" onClick={handleObjectClick}>
                        <img draggable = "false" src={warpImg} alt="ワプ" className="object-icon" />ワープ</div>
                    <div className="object" data-type="奈落" onClick={handleObjectClick}>
                        <img draggable = "false" src={narakuImg} alt="奈落" className="object-icon" />奈落</div>
                    <div id="container-button">
                        <div className="object" data-type="崩落" onClick={handleObjectClick}>
                            <img draggable = "false" src={hourakuImg} alt="崩落" className="object-icon" />崩落</div>
                        <input type="number" id="collapse-number" className="collapse-input" defaultValue="1" min="1" />
                    </div>
                    <div className="object" data-type="壁" onClick={handleObjectClick}>
                        <img draggable = "false" src={wallImg} alt="壁" className="object-icon" />壁</div>
                    <div className="object" data-type="退路" onClick={handleObjectClick}>
                        <img draggable = "false" src={escapeImg} alt="退路" className="object-icon" />退路</div>
                    <div className="object" data-type="矢印" onClick={handleObjectClick}>
                        <img draggable = "false" src={slipUpImg} alt="矢印" className="object-icon" />スリップゾーン</div>
                </div>
            </div>
            <div id="container">
                <button className = "button" onClick={onClickExport}>画像出力</button>
            </div>
        </div>
    );
};

export default App;            