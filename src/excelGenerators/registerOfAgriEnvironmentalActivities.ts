import ExcelGenerator, { Page } from "./excelGenerator";
import { AgrotechnicalOperation } from "../store/reducers/agrotechnicalOperationsReducer";
import { FarmState } from "../store/reducers/farmReducer";
import { Field } from "../store/reducers/fieldReducer";
import { Crop } from "../store/reducers/cropReducer";

class RegisterOfAgriEnvironmentalActivities extends ExcelGenerator {
  private agrotechnicalOperations: AgrotechnicalOperation[];
  private farmData: FarmState;
  private fields: Field[];
  private corps: Crop[];

  constructor(savePath: string, agrotechnicalOperations: AgrotechnicalOperation[], farmData: FarmState, fields: Field[], crops: Crop[]) {
    super(`registerOfAgroOperations.xlsx`, savePath);

    this.agrotechnicalOperations = agrotechnicalOperations;
    this.farmData = farmData;
    this.corps = crops;
    this.fields = fields;
  }

  public async generate() {
    await this.load();
    this.generatePage(1, (page) => this.generateTitlePage(page));
    this.generatePage(3, (page) => this.agrotechnicalOperationsPage(page));
    await super.generate();
  }

  public generateTitlePage(page: Page) {
    this.addInfromationAboutOwner(page);
    this.addEkoPagesAndAgroEnvPackages(page);
  }

  public addInfromationAboutOwner(page: Page) {
    page.editCell("D3", this.farmData.ownerData.legalName);
    page.editCell("D4", this.farmData.ownerData.recordNumber);
  }

  public addEkoPagesAndAgroEnvPackages(page: Page) {
    this.farmData.agroEnvPackages.forEach((pack, id) => {
      page.editCell("D", id, pack.value)
    });

    const firstLine = 7;
    const lastLine = firstLine + Math.max(this.farmData.agroEnvPackages.length - 1, this.farmData.ekoPackages.length - 1);

    page.editByLine(firstLine, lastLine, (line) => {
      const id = line.number - firstLine;
      const envPackage = this.farmData.agroEnvPackages[id];
      const ekoPackage = this.farmData.ekoPackages[id];

      if (envPackage != undefined)
        line.editCell("B", envPackage.value);

      if (ekoPackage != undefined)
        line.editCell("H", ekoPackage.value);
    });
  }

  public addEkoPackages(page: Page) {
    this.farmData.ekoPackages.forEach((pack, id) => {
      page.editCell("H", id, pack.value)
    });
  }

  public agrotechnicalOperationsPage(page: Page) {
    const firstTableLine = 5;
    const lastTableLine = firstTableLine + this.agrotechnicalOperations.length - 1;

    page.editByLine(firstTableLine, lastTableLine, (line) => {
      const operation = this.agrotechnicalOperations[line.number - firstTableLine];
      const field = this.getField(operation);
      const crop = this.getCrop(operation);

      line.setDefaultOperationRange("A", "J");
      line.setBorder("thin", "thin", "thin", "thin");
      line.setFont("Lucida Calligraphy", 14, "203764");
      line.setFontAlignment("center", "middle", true);
      line.setBold(true);
      line.setItalic(true);

      line.editCell("A", field ? field.alphabeticalId : "");
      line.editCell("B", field ? field.recordNumber : "");
      line.editCell("C", operation.date);
      line.editCell("D", field ? `${field.areaInHectares} ha` : "");
      line.editCell("E", crop ? crop.cropType : "");

      line.editCell("F", operation.activity);

      line.editCell("I", field?.realizedPackageOrVariant);
      line.editCell("J", operation.description);
    });

    if (page.lastEditedLine < 16)
      page.goToLine(16);

    page.addNextLine((line) => {
      line.mergeFromTo("A", "J");
      line.editCell("A", `* należy umieścić zapisy dotyczące: zabiegów agrotechnicznych, pielęgnacyjnych i zabiegów wykonanych środkami ochrony roślin, nawożenia i innych zabiegów wykonywanych na danej działce rolnej`);
    });

    page.addNextLine((line) => {
      line.mergeFromTo("A", "J");
      line.editCell("A", `** dla Działania rolno-środowiskowo-klimatycznego wpisać PRSK, dla Rolnictwa ekologicznego wpisać RE`);
    });

    page.addNextLine((line) => {
      line.mergeFromTo("A", "J");
      line.editCell("A", `*** należy wypełnić, gdy dana czynność lub zabieg nie są wykonywane na całej powierzchni działki rolnej (np. gdy koszeniu podlega 20% pow. działki rolnej), bądź w celu uszczegółowienia zapisów znajdujących się w innych kolumnach tego wiersza np. wskazanie sposobu realizacji integrowanej ochrony roślin (podanie co najmniej przyczyny wykonania zabiegu środkiem ochrony roślin`);
    });

    this.addControlerBox(page);
  }

  public addControlerBox(page: Page) {
    const lastLine = page.lastEditedLine + 1;

    page.editByLine(lastLine, lastLine + 2, (line) => {
      line.mergeFromTo("G", "H");
      line.mergeFromTo("I", "J");
      line.setDefaultOperationRange("A", "J");
      line.setBorder("thin", "thin", "thin", "thin");
      line.setBackground("D9D9D9");
      line.setFont("Thoma", 8);
      line.setFontAlignment("center", "middle", true);
    });

    page.editCell("A" + lastLine, "Pola wypełniane podczas kontroli na miejscu");
    page.editCell("D" + lastLine, "Data kontroli na miejscu");
    page.editCell("E" + lastLine, "Nazwisko i imię  inspektora terenowego");
    page.editCell("F" + lastLine, "Podpis inspektora terenowego");
    page.editCell("G" + lastLine, "Nazwisko i imię osoby obecnej przy kontroli");
    page.editCell("I" + lastLine, "Podpis osoby obecnej przy kontroli");

    page.mergeFromTo(`A${lastLine}`, `C${lastLine + 2}`);
    page.setRowSize(lastLine, 24.75);
  }

  public getField(opertaion: AgrotechnicalOperation) {
    const crop = this.getCrop(opertaion);

    if (opertaion.field)
      return this.fields.filter(({ id }) => id === opertaion.field)[0];

    if (!crop)
      return undefined;

    if (crop.field)
      return this.fields.filter(({ id }) => id === crop.field)[0];

    return undefined;
  }

  public getCrop(opertaion: AgrotechnicalOperation) {
    if (!opertaion.crop)
      return undefined;

    return this.corps.filter(({ id }) => id === opertaion.crop)[0];
  }
}

export default RegisterOfAgriEnvironmentalActivities;