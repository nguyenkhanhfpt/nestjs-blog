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

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
