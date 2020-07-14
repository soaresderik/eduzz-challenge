import { Get, Controller, CurrentUser } from "routing-controllers";
import { getRepository, MoreThan } from "typeorm";
import { HistoryEntity } from ".";
import { checkAuth } from "../../shared/check-user";

@Controller("/history")
export default class HistoryController {
  constructor(public _db = getRepository(HistoryEntity)) {}

  @Get()
  public async getHistory(@CurrentUser() user) {
    checkAuth(user);
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
