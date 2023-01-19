import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CustomerModel } from "./customer.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: true })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: true })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderModel)
  declare items: OrderModel[];

  @Column({ allowNull: true })
  declare total: number;
}
