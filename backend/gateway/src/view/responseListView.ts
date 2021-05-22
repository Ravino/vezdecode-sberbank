import {ResponseView} from "./responseView";


export class ResponseListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<ResponseView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<ResponseView[]> {
    return await this.itemsFn ();
  }
}
