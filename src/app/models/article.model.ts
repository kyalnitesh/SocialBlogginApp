export class Article {
  public id: string;
  public title: string;
  public description: string;
  public imagePath: string;
  public publishedOn: Date;
  public publishedBy: string;
  public toHideControls: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    imagePath: string,
    publishedOn: Date,
    publishedBy: string,
    toHidecontrols: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.publishedOn = publishedOn;
    this.publishedBy = publishedBy;
    this.toHideControls = toHidecontrols;
  }
}
