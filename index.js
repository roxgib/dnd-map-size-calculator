// A4 210 x 297
// A3 297 x 420

function calculate() {
   let mapHeight = document.getElementById("mapHeight").value;
   let mapWidth = document.getElementById("mapWidth").value;
   let squareSize = document.getElementById("squareSize").value;
   if (document.querySelector('input[name="unit"]:checked').value == "inches") {
      squareSize *= 25.4;
   } else {
      squareSize *= 10;
   }
   document.getElementById("result").innerHTML =
      calSheets(mapHeight, mapWidth, squareSize) + " sheets";
   makeSquares(mapHeight, mapWidth, squareSize);
}

function calSheets(height, width, squareSize) {
   let usableHeight, usableWidth;
   [usableHeight, usableWidth] = getUsableHeightWidth();
   let squaresPerPageVer = Math.floor(usableHeight / squareSize);
   let squaresPerPageHor = Math.floor(usableWidth / squareSize);
   let numPagesVer = Math.floor(height / squaresPerPageVer);
   let numPagesHor = Math.floor(width / squaresPerPageHor);
   let squaresPerPageVerRemainder = height % squaresPerPageVer;
   let squaresPerPageHorRemainder = width % squaresPerPageHor;
   if  (squaresPerPageVerRemainder != 0) {
      numPagesVer += 1
   }
   if  (squaresPerPageHorRemainder != 0) {
      numPagesHor += 1
   }
   return numPagesVer * numPagesHor
}

function makeSquares(height, width, squareSize) {
   let usableHeight, usableWidth;
   [usableHeight, usableWidth] = getUsableHeightWidth();
   let squaresPerPageVer = Math.floor(usableHeight / squareSize);
   let squaresPerPageHor = Math.floor(usableWidth / squareSize);
   let numPagesVer = Math.floor(height / squaresPerPageVer);
   let numPagesHor = Math.floor(width / squaresPerPageHor);
   let squaresPerPageVerRemainder = height % squaresPerPageVer;
   let squaresPerPageHorRemainder = width % squaresPerPageHor;
   document.getElementById("debug").innerHTML = `
   squaresPerPageVer: ${squaresPerPageVer}<br>
   squaresPerPageHor: ${squaresPerPageHor}<br>
   numPagesVert: ${numPagesVer}<br>
   numPagesHor: ${numPagesHor}<br>
   squaresPerPageVertRemainder: ${squaresPerPageVerRemainder}<br>
   squaresPerPageHorRemainder: ${squaresPerPageHorRemainder}<br>
   `
   let line = "<div class='line'>" + makePage(squaresPerPageVer, squaresPerPageHor, squareSize).repeat(numPagesHor);
   if (squaresPerPageHorRemainder != 0) {
      line += makePage(squaresPerPageVer, squaresPerPageHorRemainder, squareSize);
   }
   line += "</div>";
   let result = line.repeat(numPagesVer);
   if (squaresPerPageVerRemainder != 0) {
      result += "<div class='line'>" + makePage(squaresPerPageVerRemainder, squaresPerPageHor, squareSize).repeat(numPagesHor);
         if (squaresPerPageHorRemainder != 0) {
            result += makePage(squaresPerPageVerRemainder, squaresPerPageHorRemainder, squareSize);
         }
      result += "</div>";
   }

   document.getElementById("squares").innerHTML = result;
}

function makePage(height, width, squareSize) {
   let usableHeight, usableWidth;
   [usableHeight, usableWidth] = getUsableHeightWidth();
   const line =
      "<div class='line'>" 
      + `<div class = "square" style="width:${squareSize-1}px; height:${squareSize-1}px"></div>`.repeat(width) 
      + "</div>";
   let pageHeight, pageWidth;
   [pageHeight, pageWidth] = pageSize();
   const pageHTML = `<div class="page" style="height:${pageHeight}px; width:${pageWidth}px; padding:${margin()}px;"> ${line.repeat(
      height
   )}</div>`;
   return pageHTML;
}

function getUsableHeightWidth() {
   let [height, width] = pageSize();
   return [height - margin() * 2, width - margin() * 2];
}

function pageSize() {
   const sheetSize = document.querySelector('input[name="sheetSize"]:checked').value;
   let height, width;
   [height, width] = {
      A4: [297, 210],
      A3: [420, 297],
      A2: [594, 420],
   }[sheetSize];
   return rotate() ? [height, width] : [width, height];
}

function margin() {
   return document.getElementById("margin").value;
}

function rotate() {
   return document.getElementById("rotate").checked;
}
