export class BaseSerialize {
  DEFAULT = [];

  constructor(
    readonly object: any,
    readonly options: any = {},
  ) {
    Object.assign(this, object);
  }

  perform(): Record<string, any> {
    const properties = this[this.options.type || 'DEFAULT'];
    const result: Record<string, any> = {};

    properties.forEach((property) => {
      result[property] = this[property];
    });

    return result;
  }
}
