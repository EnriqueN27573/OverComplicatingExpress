// Buffer Line

interface BaseRepository {
  findAll(): any[];
  findAllById(id: number | number[]): any[];
  findAllByParam(paramObject: any): any[];
  save(data: any[]): number[];
  updateById(id: number, data: any): {};
  deleteById(id: number | number[]): {};
}

export default BaseRepository;
