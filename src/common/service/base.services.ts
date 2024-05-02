export abstract class BaseService {
  protected repository;

  abstract setRepository();

  getRepository() {
    return this.repository;
  }

  async findAll(options: any = {}) {
    return await this.getRepository().find(options);
  }

  async findOne(id: number) {
    return await this.getRepository().findOne({ where: { id } });
  }

  async findOneBy(options) {
    return await this.getRepository().findOne(options);
  }

  async create(data) {
    return await this.getRepository().save(data);
  }

  async update(id: number, data) {
    return await this.getRepository().save({
      id,
      ...data
    });
  }

  async remove(id: number) {
    return await this.getRepository().delete(id);
  }
}
