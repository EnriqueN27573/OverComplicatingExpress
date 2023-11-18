// Buffer Line

interface IBaseRepository {
  findAll(): any[];
  findAllById(id: number | number[]): any[];
  findAllByParam(paramObject: any): any[];
  save(data: any[]): number[];
  updateById(id: number, data: any): {};
  deleteById(id: number | number[]): {};
}

export default IBaseRepository;
