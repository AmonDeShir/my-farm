import { Workbook, Worksheet, Cell, Font } from "exceljs";
import fs from "fs";
import path from "path";
import os from "os";

abstract class ExcelGenerator {
  private workbook: Workbook;
  private baseFile: string;
  private savePath: string;

  constructor(baseFile: string, savePath: string) {
    this.baseFile = path.resolve(os.homedir(), ".my-farm", baseFile);
    this.savePath = savePath;
    this.workbook = new Workbook();
  }

  public async generate() {
    const buffer = await this.workbook.xlsx.writeBuffer();
    await fs.promises.writeFile(this.savePath, buffer);
  }


  protected generatePage(pageId: number, callback: (page: Page) => void) {
    const worksheet = this.workbook.getWorksheet(pageId);
    callback(new Page(worksheet));
  }

  public async load() {
    const buffer = (await fs.promises.readFile(this.baseFile)).buffer;
    await this.workbook.xlsx.load(buffer);
  }

  private async save() {
    await this.workbook.xlsx.writeFile(this.savePath);
  }
}

export class Page {
  private worksheet: Worksheet;
  private _lastEditedLine: number;

  constructor(worksheet: Worksheet) {
    this.worksheet = worksheet;
    this._lastEditedLine = 0;
  }

  public get lastEditedLine() {
    return this._lastEditedLine;
  }

  public editCell(cellId: string, data: string | number | boolean | undefined): void;
  public editCell(columnId: string, rowId: number, data: string | number | boolean | undefined): void;
  public editCell(cellId: string, rowIdOrData: string | number | boolean, data?: string | number | boolean | undefined): void {
    const id = arguments.length === 2 ? cellId : `${cellId}${rowIdOrData}`;
    const value = arguments.length === 2 ? rowIdOrData : data;

    if (value !== undefined)
      this.worksheet.getCell(id).value = typeof value === "string" ? value : value.toString();

    this._lastEditedLine = Number(id.replace(/\D/g, ""));
  }

  public editByLine(firstLineId: number, lastLineId: number, callback: (line: Line) => void) {
    for (let i = firstLineId; i <= lastLineId; i++) {
      callback(new Line(this.worksheet, i));

      this._lastEditedLine = i;
    }
  }

  public addNextLine(callback: (line: Line) => void) {
    callback(new Line(this.worksheet, this._lastEditedLine + 1));
    this._lastEditedLine += 1;
  }

  public goToLine(line: number) {
    this._lastEditedLine = line;
  }

  public mergeFromTo(from: string, to: string) {
    try {
      this.worksheet.mergeCells(from, to);
    }
    catch (error) { }
  }

  public setRowSize(row: number, size: number) {
    this.worksheet.getRow(row).height = size;
  }
}

type Border = "thin" |
  "dotted" |
  "dashDot" |
  "hair" |
  "dashDotDot" |
  "slantDashDot" |
  "mediumDashed" |
  "mediumDashDotDot" |
  "mediumDashDot" |
  "medium" |
  "double" |
  "thick";

type Horizontal = "left" | "center" | "right";
type Vertical = "top" | "middle" | "bottom";

export class Line {
  private row: number;
  private worksheet: Worksheet;
  private startOperationRange: string;
  private endOperationRange: string;
  private font: Partial<Font> = {};

  constructor(worksheet: Worksheet, row: number) {
    this.row = row;
    this.worksheet = worksheet;
    this.startOperationRange = "";
    this.endOperationRange = "";
  }

  public get number() {
    return this.row;
  }

  public setDefaultOperationRange(from: string, to: string) {
    this.startOperationRange = from;
    this.endOperationRange = to;
  }

  public setFont(fontName: string, fontSize: number, color = "000000") {
    this.font.size = fontSize;
    this.font.name = fontName;
    this.font.color = { argb: color };

    this.inRange((cell) => cell.style.font = this.font);
  }

  private inRange(callback: (cell: Cell) => void) {
    const start = this.alphabetToNumber(this.startOperationRange);
    const end = this.alphabetToNumber(this.endOperationRange);

    for (let i = start; i <= end; i++) {
      const cellId = this.getCell(this.numberToAlphabet(i));
      const cell = this.worksheet.getCell(cellId);

      callback(cell);
    }
  }

  private getCell(collumn: string) {
    return `${collumn}${this.row}`;
  }

  private alphabetToNumber(value: string) {
    const aInAsci = 65;
    return value.charCodeAt(0) - aInAsci;
  }

  private numberToAlphabet(value: number) {
    const aInAsci = 65;
    return String.fromCharCode(value + aInAsci);
  }


  public setBorder(topBorder: Border, rightBorder: Border, bottomBorder: Border, leftBorder: Border) {
    this.inRange((cell) => {
      cell.border = {
        top: { style: topBorder },
        right: { style: rightBorder },
        bottom: { style: bottomBorder },
        left: { style: leftBorder }
      }
    });
  }

  public setBackground(color: string) {
    this.inRange((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        bgColor: { argb: color },
        fgColor: this.font.color ? this.font.color : { argb: "000000" }
      }
    });
  }

  public setFontAlignment(horizontal: Horizontal, vertical: Vertical, wrapText: boolean) {
    this.inRange((cell) => {
      cell.style.alignment = {
        horizontal: horizontal,
        vertical: vertical,
        wrapText: wrapText
      }
    });
  }

  public setBold(enabled: boolean) {
    this.font.bold = enabled;
    this.inRange((cell) => cell.style.font = this.font);
  }

  public setItalic(enabled: boolean) {
    this.font.italic = enabled;
    this.inRange((cell) => cell.style.font = this.font);
  }

  public mergeFromTo(from: string, to: string) {
    try {
      this.worksheet.mergeCells(this.getCell(from), this.getCell(to));
    }
    catch (error) { }
  }

  public editCell(columnId: string, data: string | number | boolean | undefined) {
    this.worksheet.getCell(this.getCell(columnId)).value = data === undefined ? "" : data;
  }

}

export default ExcelGenerator;