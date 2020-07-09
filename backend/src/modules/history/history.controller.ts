import { Get, Controller } from "routing-controllers";
import { getRepository, MoreThan } from "typeorm";
import { HistoryEntity } from ".";

@Controller("/history")
export default class HistoryController {
  constructor(public _db = getRepository(HistoryEntity)) {}

  @Get()
  public async getHistory() {
    const dateNow = new Date();
    return this._db.find({
      where: {
        createdAt: MoreThan(
          new Date(dateNow.setHours(dateNow.getHours() - 24))
        ),
      },
    });
  }
}
