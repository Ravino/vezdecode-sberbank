import {VacancyView} from "./vacancyView";


export class VacancyListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<VacancyView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<VacancyView[]> {
    return await this.itemsFn ();
  }
}
