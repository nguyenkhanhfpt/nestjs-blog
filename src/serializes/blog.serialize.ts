import { BaseSerialize } from './base.serialize';
import { BlogCategoriesSerialize } from './blog-categories.serialize';

export class BlogSerialize extends BaseSerialize {
  BLOG_LIST = ['id', 'title', 'slug', 'isPublic', 'content', 'blogCategories', 'combine'];

  get isPublic(): boolean {
    return Boolean(this.object.isPublic);
  }

  set isPublic(value: boolean) {
    this.object.isPublic = value;
  }

  get blogCategories(): boolean {
    return this.object.blogCategories.map((blogCategory) => {
      return new BlogCategoriesSerialize(blogCategory, {
        type: 'BLOG_CATEGORY_INFO',
      }).perform();
    });
  }

  set blogCategories(value) {
    this.object.blogCategories = value;
  }

  get combine(): string {
    return this['slug'] + ' ' + this['content'];
  }
}
