import { DataSource, EntityTarget, ObjectLiteral } from "typeorm"

export function getDataSource(): DataSource {
  return global['DataSource'] || null
}


export function getRepository<T extends ObjectLiteral>(target: EntityTarget<T>) {
  const dataSource = getDataSource();
  return dataSource.getRepository(target)
}
