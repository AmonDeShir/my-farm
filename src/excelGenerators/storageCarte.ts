import ExcelGenerator, { Page } from "./excelGenerator";
import { FarmState } from "../store/reducers/farmReducer";
import { StorageRecord } from "../store/reducers/storageReducer";
import { sortByDate } from "../sort/sort";

class StorageCarte extends ExcelGenerator {
  private farmData: FarmState;
  private storageRecords: StorageRecord[];

  constructor(savePath: string, storageRecords: StorageRecord[], farmData: FarmState) {
    super(`storage.xlsx`, savePath);

    this.storageRecords = sortByDate(storageRecords);
    this.farmData = farmData;
  }

  public async generate() {
    await this.load();

    this.generatePage(1, (page) => {
      this.addFarmInformation(page);
      this.addProductName(page);
      this.addOperations(page);
    });

    await super.generate();
  }

  public addFarmInformation(page: Page) {
    page.editCell("B2", this.farmData.farmName);
    page.editCell("G2", this.farmData.districtNumber);
    page.editCell("I2", this.farmData.plEkoNumber);
  }

  private addProductName(page: Page) {
    if (this.storageRecords.length <= 0)
      return;

    page.editCell("A5", this.storageRecords[0].product);
  }

  private addOperations(page: Page) {
    const firstTableLine = 7;
    const lastTableLine = firstTableLine + this.storageRecords.length;

    page.editByLine(firstTableLine, lastTableLine, (line) => {
      const record = this.storageRecords[line.number - firstTableLine];
      const actualState = this.calcActualState(record);

      line.setDefaultOperationRange("A", "I");
      line.setBorder("medium", "medium", "medium", "medium");
      line.setFont("Arial", 16);
      line.setFontAlignment("center", "middle", true);
      line.setBold(false);
      line.setItalic(false);
      line.mergeFromTo("E", "I");

      line.editCell("A", record.date);
      line.editCell("B", record.type === "Rozchód" ? 0 : record.amount);
      line.editCell("C", record.type !== "Rozchód" ? record.amount : 0);
      line.editCell("D", actualState);
    });
  }

  private calcActualState(record: StorageRecord) {
    let records = this.removeRecordAfter(this.storageRecords, record);

    return this.totalRecordsUp(records);
  }

  private removeRecordAfter = (records: StorageRecord[], record: StorageRecord) => {
    const limit = records.indexOf(record);

    return records.splice(0, limit + 1);
  }

  private totalRecordsUp = (records: StorageRecord[]) => {
    let result = 0;

    for (const { amount, type } of records) {
      if (type === "Przychud")
        result += amount;
      else
        result -= amount;
    }

    return result;
  }
}

export default StorageCarte;