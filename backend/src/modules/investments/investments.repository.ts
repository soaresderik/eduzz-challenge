import {
  getRepository,
  EntityRepository,
  SelectQueryBuilder,
  getConnection,
} from "typeorm";
import { InvestmentEntity } from ".";
import HttpException from "../../exceptions/http.exception";
import { InvesmentArgs } from ".";

@EntityRepository(InvestmentEntity)
export default class InvestmentsRepository {
  constructor(
    public _db = getRepository(InvestmentEntity),
    private query?: SelectQueryBuilder<InvestmentEntity>
  ) {
    this.query = this._db.createQueryBuilder();
  }

  public async purchase(investment: InvesmentArgs) {
    const queryRunner = getConnection().createQueryRunner();
    let result = null;
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        `INSERT INTO accounts (value,transaction_type,user_id) VALUES ($1, $2, $3);`,
        [-Math.abs(investment.purchaseAmount), "investment", investment.user.id]
      );

      result = await queryRunner.query(
        "INSERT INTO investments (purchase_amount, crypto_amount, purchase_crypto_price, user_id) VALUES ($1, $2, $3, $4) RETURNING id;",
        [
          investment.purchaseAmount,
          investment.cryptoAmount,
          investment.purchaseCryptoPrice,
          investment.user.id,
        ]
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log({ err });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (result && result[0].id) {
      const res = await this._db.findOne({
        where: { id: result[0].id },
        select: ["id", "purchaseAmount", "cryptoAmount", "purchaseCryptoPrice"],
      });
      return {
        ...res,
        cryptoAmount: +res.cryptoAmount,
      };
    }

    throw new HttpException(
      500,
      "Erro ao tentar aplicar investimento. Favor tente mais tarde"
    );
  }
}
